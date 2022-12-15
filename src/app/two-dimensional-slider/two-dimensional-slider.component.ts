import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export interface Vector2D {
  x: number;
  y: number;
}

export const PRECISION = 8;

@Component({
  selector: 'moe-2d-slider',
  templateUrl: './two-dimensional-slider.component.html',  
  styleUrls: ['./two-dimensional-slider.component.scss'],
})
export class TwoDimensionalSliderComponent implements OnChanges {
  public markerLeft = '0px';
  public markerTop = '0px';
  public x = 0;
  public y = 0;

  @Input() value: Vector2D = { x: 0, y: 0 };
  @Output() valueChanged = new EventEmitter<Vector2D>();

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const valueChanges = simpleChanges.value;
    if (valueChanges) {
      this.updateValue(valueChanges.currentValue);
    }
  }

  drag(event: DragEvent): void {
    if (event.screenX === 0 && event.screenY === 0) {
      return;
    }

    const marker = event.target as HTMLDivElement;
    const markerBounds = marker.parentElement;
    const boundingRect = markerBounds.getBoundingClientRect();
    let markerLeft = event.clientX - boundingRect.left;
    let markerTop = event.clientY - boundingRect.top;
    const { x, y } = this.getVectorFromMarkerPosition({ x: markerLeft, y: markerTop });
    this.updateValue({ x, y });
  }

  updateValue(vector: Vector2D): void {
    const markerPosition = this.getMarkerPositionFromVector(vector);

    this.markerLeft = `${markerPosition.x}px`;
    this.markerTop = `${markerPosition.y}px`;

    this.x = this.getRoundedValue(vector.x, PRECISION);
    this.y = this.getRoundedValue(vector.y, PRECISION);
    this.valueChanged.emit({ x: this.x, y: this.y });
  }

  getVectorFromMarkerPosition(markerPosition: Vector2D): Vector2D {
    const markerLeft = markerPosition.x;
    const markerTop = markerPosition.y;

    const boundingRect = this.getBoundingRect();
    const boundMarkerLeft = this.getBoundValue(markerLeft, 0, boundingRect.width);
    const boundMarkerTop = this.getBoundValue(markerTop, 0, boundingRect.height);

    const x = boundMarkerLeft / boundingRect.width;
    const y = boundMarkerTop / boundingRect.height;

    return { x, y };
  }

  getMarkerPositionFromVector(vector: Vector2D): Vector2D {
    const { x, y } = vector;
    const boundX = this.getBoundValue(x, 0, 1);
    const boundY = this.getBoundValue(y, 0, 1);

    const boundingRect = this.getBoundingRect();

    const markerLeft = boundX * boundingRect.width;
    const markerTop = boundY * boundingRect.height;

    return { x: markerLeft, y: markerTop };
  }

  getBoundingRect(): DOMRect {
    const hostElement = this.elementRef.nativeElement as HTMLDivElement;
    const markerBounds = hostElement.getElementsByClassName('marker-bounds')[0];
    return markerBounds.getBoundingClientRect();
  }

  getBoundValue(value: number, minimum: number, maximum: number): number {
    if (value < minimum) {
      return minimum;
    }
    if (value > maximum) {
      return maximum;
    }
    return value;
  }

  getRoundedValue(value: number, precision: number): number {
    const powerOfTen = Math.pow(10, precision)
    return Math.round(value * powerOfTen) / powerOfTen;
  }

}
