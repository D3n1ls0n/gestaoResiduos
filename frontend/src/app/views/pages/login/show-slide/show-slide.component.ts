import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-slide',
  templateUrl: './show-slide.component.html',
  styleUrl: './show-slide.component.scss'
})
export class ShowSlideComponent {
public email = 'limpohorizonte@outlook.com'
  public slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides = [];

    this.slides[0] = {
      id: 0,
      src: './assets/img/img2.png',
      title: 'Missão',
      subtitle: 'contribuir para um ambiente mais limpo e saudável, fornecendo soluções eficientes para a gestão de resíduos.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/img2.png',
      title: 'Visão',
      subtitle: 'Ser reconhecido como um catalisador de mudanças positivas no gerenciamento de resíduos, oferecendo uma plataforma inovadora que promove a economia circular e impulsiona práticas sustentáveis em nível global.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/img/img2.png',
      title: 'Coragem',
      subtitle: 'Comprometidos em enfrentar obstáculos com determinação e acreditar que a coragem é essencial para impulsionar a transformação e alcançar um ambiente mais limpo e saudável para as gerações futuras.'
    }

  }

}
