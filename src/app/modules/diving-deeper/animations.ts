import {Animation, Vector3} from '@babylonjs/core';

export class Animations {
  static getXSlide(frameRate: number, startFrame: number, endFrame: number) {
    const xSlide = new Animation(
      'xSlide',
      'position.x',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: startFrame,
      value: 2,
    });

    keyFrames.push({
      frame: endFrame,
      value: -2,
    });

    // keyFrames.push({
    //   frame: endFrame * frameRate,
    //   value: 2,
    // });

    xSlide.setKeys(keyFrames);

    return xSlide;
  }

  static getYSlide(frameRate: number, startFrame: number, endFrame: number) {
    const ySlide = new Animation(
      'ySlide',
      'position.y',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFrames = [];

    keyFrames.push({
      frame: startFrame,
      value: 2,
    });

    keyFrames.push({
      frame: endFrame,
      value: -2,
    });

    // keyFrames.push({
    //   frame: endFrame * frameRate,
    //   value: 2,
    // });

    ySlide.setKeys(keyFrames);

    return ySlide;
  }

  static getCameraRotate(frameRate: number) {
    const rotate = new Animation(
      'rotate',
      'rotation.y',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const rotate_keys = [];

    rotate_keys.push({
      frame: 0,
      value: 0
    });

    rotate_keys.push({
      frame: 9 * frameRate,
      value: 0
    });

    rotate_keys.push({
      frame: 14 * frameRate,
      value: Math.PI
    });

    rotate.setKeys(rotate_keys);

    return rotate;
  }

  static getCameraMoving(frameRate: number) {
    const movein = new Animation(
      'movein',
      'position',
      frameRate,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const movein_keys = [];

    movein_keys.push({
      frame: 0,
      value: new Vector3(0, 5, -30)
    });

    movein_keys.push({
      frame: 3 * frameRate,
      value: new Vector3(0, 2, -10)
    });

    movein_keys.push({
      frame: 5 * frameRate,
      value: new Vector3(0, 2, -10)
    });

    movein_keys.push({
      frame: 8 * frameRate,
      value: new Vector3(-2, 2, 3)
    });

    movein.setKeys(movein_keys);

    return movein;
  }

  static getDoorSweeping(frameRate: number) {
    const sweep = new Animation(
      'sweep',
      'rotation.y',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const sweep_keys = [];

    sweep_keys.push({
      frame: 0,
      value: 0
    });

    sweep_keys.push({
      frame: 3 * frameRate,
      value: 0
    });

    sweep_keys.push({
      frame: 5 * frameRate,
      value: Math.PI / 3
    });

    sweep_keys.push({
      frame: 13 * frameRate,
      value: Math.PI / 3
    });

    sweep_keys.push({
      frame: 15 * frameRate,
      value: 0
    });

    sweep.setKeys(sweep_keys);

    return sweep;
  }

  static getLightDimmer(frameRate: number) {
    const lightDimmer = new Animation(
      'dimmer',
      'intensity',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    const light_keys = [];

    light_keys.push({
      frame: 0,
      value: 0
    });

    light_keys.push({
      frame: 7 * frameRate,
      value: 0
    });

    light_keys.push({
      frame: 10 * frameRate,
      value: 1
    });

    light_keys.push({
      frame: 14 * frameRate,
      value: 1
    });

    light_keys.push({
      frame: 15 * frameRate,
      value: 0
    });

    lightDimmer.setKeys(light_keys);

    return lightDimmer;
  }
}
