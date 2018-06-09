import { Component, OnInit } from '@angular/core';
import { LayoutFooterService } from './layout_footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public footer: LayoutFooterService,
  ) { }

  ngOnInit() {
  }

}
