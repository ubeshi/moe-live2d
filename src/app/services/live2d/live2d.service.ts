import { Injectable } from '@angular/core';
import { LAppLive2DManager } from 'src/live2d-library/Samples/TypeScript/Demo/src/lapplive2dmanager';
import { LAppDelegate, canvas } from 'src/live2d-library/Samples/TypeScript/Demo/src/lappdelegate';
import * as LAppDefine from 'src/live2d-library/Samples/TypeScript/Demo/src/lappdefine';
import { csmVector } from 'src/live2d-library/Framework/src/type/csmvector';
import { LAppModel } from 'src/live2d-library/Samples/TypeScript/Demo/src/lappmodel';
import { getRange } from 'src/utilities/array/array-utilities';
import { csmString } from 'src/live2d-library/Framework/src/type/csmstring';
import { CubismFramework } from 'src/live2d-library/Framework/src/live2dcubismframework';

enum ModelName {
  HARU = 'Haru',
  HIYORI = 'Hiyori',
  MAO = 'Mao',
  MARK = 'Mark',
  NATORI = 'Natori',
  RICE = 'Rice',
}

@Injectable({
  providedIn: 'root',
})
export class Live2dService {
  // Live2D uses a singleton class LAppLive2DManager to manage the scenes
  // This singleton service wraps around that class in an angular way

  private live2dManager: LAppLive2DManager;

  constructor() {
    window.onresize = () => {
      if (LAppDefine.CanvasSize === 'auto') {
        LAppDelegate.getInstance().onResize();
      }
    };

    if (LAppDelegate.getInstance().initialize() == false) {
      throw new Error('Could not initialize Live2D LAppDelegate');
    }

    LAppDelegate.getInstance().run();
    this.live2dManager = LAppLive2DManager.getInstance();
  }

  ngOnDestroy(): void {
    LAppDelegate.releaseInstance();
  }

  getModelNames(): string[] {
    return Object.values(ModelName);
  }

  getCanvas(): HTMLCanvasElement {
    return canvas;
  }

  setCanvasParent(element: HTMLElement): void {
    canvas.parentElement.removeChild(canvas);
    element.appendChild(canvas);
  }

  loadModelByName(modelName: string): Promise<void> {
    return this.live2dManager.loadModelByName(modelName);
  }

  getLoadedModels(): csmVector<LAppModel> {
    return this.live2dManager._models;
  }

  getModelExpressionNames(model: LAppModel): string[] {
    return model._expressions._keyValues
      .filter((keyValue) => keyValue !== undefined)
      .map((keyValue) => keyValue.first)
      .sort((nameA, nameB) => nameA.localeCompare(nameB));
  }

  getModelMotionGroupNames(model: LAppModel): string[] {
    const modelSetting = model._modelSetting;
    const motionGroupCount = modelSetting.getMotionGroupCount();
    const range = getRange(motionGroupCount);
    return range.map((index) => modelSetting.getMotionGroupName(index));
  }

  getModelMotionNames(model: LAppModel, motionGroupName: string): string[] {
    const modelSetting = model._modelSetting;
    const motionCount = modelSetting.getMotionCount(motionGroupName);
    const range = getRange(motionCount);
    return range.map((index) => modelSetting.getMotionFileName(motionGroupName, index));
  }

  setModelFaceTarget(model: LAppModel, targetX: number, targetY: number): void {
    model.setDragging(targetX, targetY);
  }
}
