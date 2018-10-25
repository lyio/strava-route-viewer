import { Component, OnInit, Input } from '@angular/core';
import { Athlete } from '../model/athlete';

@Component({
  selector: 'app-poster-footer',
  templateUrl: './poster-footer.component.html',
  styleUrls: ['./poster-footer.component.css']
})
export class PosterFooterComponent implements OnInit {

  @Input()
  athlete: Athlete = new Athlete();

  constructor() { }

  ngOnInit() {
  }

}
