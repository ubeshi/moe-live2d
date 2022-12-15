import { Component, ElementRef, ViewChild } from '@angular/core';
import { Live2dService } from '../services/live2d/live2d.service';
import { MatSelectChange } from '@angular/material/select';
import { Vector2D } from '../two-dimensional-slider/two-dimensional-slider.component';

@Component({
  selector: 'moe-live2d',
  templateUrl: './live2d.component.html',
})
export class Live2dComponent {
  @ViewChild('canvasContainer') canvasContainer: ElementRef;

  public selectedModelName: string;
  public selectedMotionGroupName: string;
  public expressionNames = [];
  public motionGroupNames = [];
  public motionNames = [];

  constructor(public live2dService: Live2dService) {
    this.selectedModelName = live2dService.getModelNames()[0];
    this.loadModelByName(this.selectedModelName);
  }

  ngAfterViewInit() {
    this.live2dService.setCanvasParent(this.canvasContainer.nativeElement);
  }

  async handleCharacterSelectionChanged(selectChange: MatSelectChange): Promise<void> {
    await this.loadModelByName(selectChange.value);

  }

  async loadModelByName(modelName: string): Promise<void> {
    await this.live2dService.loadModelByName(modelName);
    const model = this.live2dService.getLoadedModels().at(0);
    this.expressionNames = this.live2dService.getModelExpressionNames(model);
    this.motionGroupNames = this.live2dService.getModelMotionGroupNames(model);
  }

  handleExpressionClicked(expressionName: string): void {
    const model = this.live2dService.getLoadedModels().at(0);
    model.setExpression(expressionName);
  }

  handleMotionGroupClicked(motionGroupName: string): void {
    this.selectedMotionGroupName = motionGroupName;
    const model = this.live2dService.getLoadedModels().at(0);
    this.motionNames = this.live2dService.getModelMotionNames(model, motionGroupName);
  }

  handleMotionClicked(motionGroupName: string, motionIndex: number): void {
    const model = this.live2dService.getLoadedModels().at(0);
    model.startMotion(motionGroupName, motionIndex, 2);
  }

  handleLookDirectionChanged(vector2d: Vector2D) {
    const model = this.live2dService.getLoadedModels().at(0);
    const { x, y } = vector2d;

    const lookX = x * 2 - 1;
    const lookY = -(y * 2 - 1);

    this.live2dService.setModelFaceTarget(model, lookX, lookY);
  }
}
