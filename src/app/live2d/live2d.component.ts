import { Component, ElementRef, ViewChild } from '@angular/core';
import { Live2dService } from '../services/live2d/live2d.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'moe-live2d',
  templateUrl: './live2d.component.html',
})
export class Live2dComponent {
  @ViewChild('canvasContainer') canvasContainer: ElementRef;

  public selectedModelName: string;

  constructor(public live2dService: Live2dService) {
    this.selectedModelName = live2dService.getModelNames()[0];
  }

  ngAfterViewInit() {
    this.live2dService.setCanvasParent(this.canvasContainer.nativeElement);
  }

  handleCharacterSelectionChanged(selectChange: MatSelectChange): void {
    this.live2dService.loadModelByName(selectChange.value);
  }
}
