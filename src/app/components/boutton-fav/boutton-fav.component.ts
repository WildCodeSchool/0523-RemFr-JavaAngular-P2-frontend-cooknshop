import { Component } from '@angular/core';

@Component({
  selector: 'app-boutton-fav',
  templateUrl: './boutton-fav.component.html',
  styleUrls: ['./boutton-fav.component.scss']
})
export class BouttonFavComponent {
  imageUrl = '/assets/contour-coeur.png';

  addFavorite() {
    if (this.imageUrl === '/assets/contour-coeur.png') {
      this.imageUrl = '/assets/coeur-remplis.png';
    } else {
      this.imageUrl = '/assets/contour-coeur.png';
    }
  }
}
