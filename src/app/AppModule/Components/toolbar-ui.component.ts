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
  @Output() idEntered = new EventEmitter<string>();
  @Output() listEntered = new EventEmitter<string>();

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
    if (value.indexOf('list=PL') >= 0) {
      this.listEntered.emit(value.split('list=')[1]);
    } else {
      this.idEntered.emit(value.split('v=')[1]);
    }
  }
}
