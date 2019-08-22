---
title: '发送fabio的消息到kafka'
date: 2017-07-17 22:32:18
tags:
- kafka
- fabio
- golang
---

````go
package main

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"
	"strings"
	"github.com/Shopify/sarama"
)

var (
	asyncProducer        *sarama.AsyncProducer
)

func main() {
	execCommand()
}

func execCommand() {
	cmd := exec.Command("/fabio", "-cfg", "/etc/fabio/fabio.properties")
	fmt.Println(cmd.Args)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println(err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		fmt.Println(err)
	}
	cmd.Start()
	go printLog(stdout)
	go printLog(stderr)
	cmd.Wait()
}

func printLog(readCloser io.ReadCloser) {
	reader := bufio.NewReader(readCloser)
	for {
		line, err2 := reader.ReadString('\n')
		if err2 != nil || io.EOF == err2 {
			break
		}
		fmt.Print(line)
		go sendMessage(line)
	}
}

func gerProducer() sarama.AsyncProducer {
	if asyncProducer != nil {
		return *asyncProducer
	} else {
		config := sarama.NewConfig()
		config.Producer.Return.Successes = true
		config.Producer.RequiredAcks = sarama.WaitForAll
		p, err := sarama.NewAsyncProducer(strings.Split("192.168.1.1:9092", ","), config)
		if err != nil {
			fmt.Println("kafka failed")
		}
		asyncProducer = &p
		return *asyncProducer
	}
}

func sendMessage(message string) {
	msg := &sarama.ProducerMessage{
		Topic: "test",
		Value: sarama.ByteEncoder(message),
	}
	p := gerProducer()
	go func(p sarama.AsyncProducer) {
		errors := p.Errors()
		success := p.Successes()
		for {
			select {
			case err := <-errors:
				if err != nil {
					fmt.Println("kafka error")
				}
			case <-success:
			}
		}
	}(p)
	p.Input() <- msg
}
````

