'use strict';

var config = {
  img_placeholder: 'https://ws4.sinaimg.cn/large/e724cbefgw1etyppy7bgwg2001001017.gif',
};

if (hexo.config.image_stream) {
  for (var key in config) {
    if (hexo.config.image_stream[key] != null) {
      config[key] = hexo.config.image_stream[key];
    }
  }
}

hexo.extend.tag.register(
  'stream',
  function (args, content) {
    return [
      `<div class="hexo-img-stream">`,
      `<style type="text/css">`,
      '  .hexo-image-steam-lazy {',
      '    display:block;',
      '  }',
      '  .hexo-img-stream {',
      '    max-width:1100px;',
      '    text-align: center;',
      '  }',
      '  div.hexo-img-stream figure {',
      '    background:#fefefe;',
      '    box-shadow:0 1px 2px rgba(34,25,25,0.4);',
      '    margin:0 1.00% 3%;',
      '    padding:2%;',
      '    padding-bottom:10px;',
      '    display:inline-block;',
      '    width:30%',
      '  }',
      '  div.hexo-img-stream figure img {',
      '    border-bottom:1px solid #ccc;',
      '    padding-bottom:15px;',
      '    margin-bottom:5px;',
      '  }',
      '  div.hexo-img-stream figure figcaption {',
      '    font-size:.9rem;',
      '    color:#444;',
      '    line-height:1.5;',
      '    overflow:hidden;',
      '    text-overflow:ellipsis;',
      '    white-space:nowrap;',
      '  }',
      '  div.hexo-img-stream small {',
      '    font-size:1rem;',
      '    float:right;',
      '    text-transform:uppercase;',
      '    color:#aaa;',
      '  }',
      '  div.hexo-img-stream small a{',
      '    color:#666;',
      '    text-decoration:none;',
      '    transition:.4s color;',
      '  }',
      '  @media screen and (max-width:750px) {',
      '    .hexo-img-stream {',
      '      column-gap:0;',
      '    }',
      '  }',
      '</style>',
      content,
      '</div>',
      '<script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>',
      '<script src="https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.js"></script>',
      '<script type="text/javascript">',
      `  $('img.hexo-image-steam-lazy').lazyload({ effect:'fadeIn' });`,
      '</script>',
    ].join('\n');
  },
  { ends: true },
);

hexo.extend.tag.register('figure', function (args) {
  var imgUrl = args.shift();
  var title = args.join(' ');
  var placeholder = config['img_placeholder'];

  const content = hexo.render
    .renderSync({ text: title, engine: 'markdown' })
    .replace(/<p>/, '<center>')
    .replace(/<.p>/, '</center>');

  return [
    '<figure>',
    `  <img class="hexo-image-steam-lazy nofancy" src="${placeholder}" data-original="${imgUrl}" />`,
    `  <noscript><img src="${imgUrl}"/></noscript>`,
    `  <figcaption> ${content} </figcaption>`,
    '</figure>',
  ].join('\n');
});
