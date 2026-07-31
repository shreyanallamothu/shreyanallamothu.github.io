document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach((el) => {
    const track = el.querySelector('.carousel-track');
    const step = () => track.clientWidth * 0.8;

    el.querySelector('.prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    el.querySelector('.next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });
});
