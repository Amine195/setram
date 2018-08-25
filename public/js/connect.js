document.addEventListener('DOMContentLoaded', function () {
    particleground(document.getElementById('particles'), {
      dotColor: '#fff',
      lineColor: '#fff',
      density: 15000,
      parallax: false,
      particleRadius: 1.5,
      lineWidth: 0.2
    });
    var intro = document.getElementById('intro');
    intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);