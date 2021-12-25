import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Animation, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3} from '@babylonjs/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('animation') animationCanvas: ElementRef | undefined;
  @HostListener('window:resize') onWindowResize = () => {
    this.renderTheScene();
  }

  babylonCanvas: HTMLCanvasElement | undefined;
  babylonEngine: Engine | undefined;

  scene: Scene | undefined;

  box: Mesh | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.animationCanvas) {
      this.initTheCube();
    }
  }

  initTheCube() {
    this.babylonCanvas = this.animationCanvas?.nativeElement;
    if (this.babylonCanvas) {
      this.babylonEngine = new Engine(this.babylonCanvas, true, {preserveDrawingBuffer: true, stencil: true});

      this.createScene();
    }
  }

  createScene() {
    if (this.babylonEngine) {
      this.scene = new Scene(this.babylonEngine);
    }

    if (this.scene) {
      const camera = new FreeCamera('animationCamera', new Vector3(0, 5, -10), this.scene);
      camera.setTarget(Vector3.Zero());
      camera.attachControl(this.babylonCanvas, false);
      const light = new HemisphericLight('animationLight', new Vector3(0, 1, 0), this.scene);
      this.box = MeshBuilder.CreateBox('animationBox', {}, this.scene);
      this.box.position.y = 1;
    }

    this.renderTheScene();
  }

  renderTheScene() {
    if (this.babylonEngine) {
      this.babylonEngine.runRenderLoop(() => {
        if (this.scene)
          this.scene.render();
      })
    }
  }

  animateTheCube(): void {
    const frameRate = 10;

    const xSlide = new Animation(
      'xSlide',
      'position.x',
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
      );

    const keyFrames = [];

    keyFrames.push({
      frame: 0,
      value: 2,
    });

    keyFrames.push({
      frame: frameRate,
      value: -2,
    });

    keyFrames.push({
      frame: 2 * frameRate,
      value: 2,
    });

    xSlide.setKeys(keyFrames);

    if (this.box) {
      this.box.animations.push(xSlide);
      if (this.scene) {
        this.scene.beginAnimation(this.box, 0, 2 * frameRate, true);
      }
    }
  }

  ngOnDestroy() {
  }
}
