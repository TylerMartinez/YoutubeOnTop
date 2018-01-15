import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-toolbar-ui',
  templateUrl: './HTML/toolbar-ui.component.html',
  styleUrls: ['./CSS/toolbar-ui.component.css']
})
export class ToolbarUIComponent {
  // Members
  controlsVisible = false;

  // ViewChild members
  @ViewChild('controlArea') controlArea: ElementRef;

  // Output members
  @Output() urlEntered = new EventEmitter<object[]>();

  // Constructor
  constructor() { }

  // Event Handlers
  onControlAreaEnter() {
    this.controlsVisible = true;
  }
  onControlAreaLeave(event) {
    // Check to see if we went to a child element
    // Only need this because of Electron otherwise it works fine in browsers
    if (event.clientX > 4 &&
        event.clientX < window.innerWidth - 4 &&
        event.clientY > 4 &&
        event.clientY < this.controlArea.nativeElement.offsetHeight) {
       return;
    }

    this.controlsVisible = false;
  }
  onCloseClick() {
    window.close();
  }
  onVideoEnter(value: string) {
    // parse out parameters
    const params: object[] = [];
    let param: string;

    if (value.indexOf('list=PL') >= 0) {
      param = value.split('list=')[1];
      params.push({
          type: 'list',
          value: param.split('&')[0]
        }
      );

      if (value.indexOf('index=') >= 0) {
        param = value.split('index=')[1];
        params.push({
            type: 'index',
            value: param.split('&')[0]
          }
        );
      }
    } else if (value.indexOf('v=') >= 0) {
      param = value.split('v=')[1];
      params.push({
          type: 'v',
          value: param.split('&')[0]
        }
      );
    }

    if (params.length > 0) {
      this.urlEntered.emit(params);
    }
  }
}
