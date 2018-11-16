import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-canvas-exporter',
  templateUrl: './canvas-exporter.component.html',
  styleUrls: ['./canvas-exporter.component.css']
})
export class CanvasExporterComponent implements OnInit {

  private imageUrl: string;

  constructor() { }

  ngOnInit() {
  }

  exportToCanvas() {
    console.log('exporting started....');

    html2canvas(document.querySelector('app-routes-list-container'), { backgroundColor: 'rgb(43, 51, 77)'})
      .then((canvas: HTMLCanvasElement) => {
        this.exportToImage(canvas.toDataURL('image/png', 1.0));
    });
    return false;
  }

  exportToImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;

    const a = document.createElement('a');
    a.setAttribute('download', 'foobar.png');
    a.setAttribute('href', imageUrl);
    a.appendChild(img);

    document.querySelector('#canvas-container').appendChild(a);
  }
}
