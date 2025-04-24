import { Component, inject} from '@angular/core';
import { LINKS } from '../models/category';
import { ROUTE_TOKENS } from '../models/route-tokens';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';


@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive
  ]
})
export class HeaderComponent {
  showMenu = false;
  readonly LINKS = LINKS;
  readonly ROUTE_TOKENS = ROUTE_TOKENS;
  protected readonly cartService= inject(CartService)

  readonly menuItemOne = 'Menu Item One';
  readonly logoUrl = '../../assets/images/justlikepeople.png';

  toggleMenu(){
    this.showMenu = !this.showMenu;
    console.log(LINKS);
    console.log('menu was closed!');
  }

  selectCategory(name: string){
    this.showMenu = false;
    console.log(name, ' was clicked!');
  }
}
