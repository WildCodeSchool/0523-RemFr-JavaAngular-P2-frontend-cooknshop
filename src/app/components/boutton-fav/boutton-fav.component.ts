import { Component, Input } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-boutton-fav',
  templateUrl: './boutton-fav.component.html',
  styleUrls: ['./boutton-fav.component.scss'],
})
export class BouttonFavComponent {
  constructor(private ApiCallService: ApiCallService) {}

  imageUrl = '/assets/contour-coeur.png';
  @Input() recipeData: any;

  addFavorite(id: any) {
    if (this.imageUrl === '/assets/contour-coeur.png') {
      // const postData = {
      //   id: id,
      //   favorite: true,
      // };
      // this.ApiCallService.PutResponse('recipes/id/favorite', postData);
      // console.log(this.recipeData.id);
      this.imageUrl = '/assets/coeur-remplis.png';
    } else {
      this.imageUrl = '/assets/contour-coeur.png';
    }
  }
}
