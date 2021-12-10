import './sources.css';
import { IDataSource } from '../../types';

class Sources {
  draw(data: IDataSource[], letter: string): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    const filteredData = data.filter((item) => item.name[0] === letter);

    filteredData.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id as string);

      fragment.append(sourceClone);
    });

    (document.querySelector('.sources') as HTMLElement).append(fragment);
  }

  drawLetters(data: IDataSource[]): void {
    const result: string[] = [];
    data.forEach((item) => {
      if (!result.includes(item.name[0])) {
        result.push(item.name[0]);
      }
    });

    const fragment = document.createDocumentFragment();
    const letterItemTemp = document.querySelector('#lettersItemTemp') as HTMLTemplateElement;

    result.forEach((item) => {
      const letterClone = letterItemTemp.content.cloneNode(true) as HTMLTemplateElement;

      (letterClone.querySelector('.letters__item') as HTMLElement).textContent = item;
      (letterClone.querySelector('.letters__item') as HTMLElement).setAttribute('data-letter', item);

      fragment.append(letterClone);
    });

    (document.querySelector('.letters') as HTMLElement).append(fragment);

    const lettersContainer = document.querySelector('.letters') as HTMLElement;
    const letters = Array.from(document.querySelectorAll('.letters__item'));
    letters[0].classList.add('active');

    lettersContainer.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      if (el.classList.contains('letters__item')) {
        this.filter(data, el);
        letters.forEach((element) => {
          if (element.classList.contains('active')) {
            element.classList.remove('active');
          }
        });
        el.classList.add('active');
      }
    });
  }

  filter(data: IDataSource[], el: HTMLElement): void {
    const source = document.querySelector('.sources') as HTMLElement;
    source.innerHTML = '';
    const letter = el.dataset.letter as string;
    this.draw(data, letter);
  }
}

export default Sources;
