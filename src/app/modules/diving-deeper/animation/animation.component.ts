import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3} from '@babylonjs/core';

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
      const sphere = MeshBuilder.CreateBox('animationBox', {}, this.scene);
      sphere.position.y = 1;
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

  ngOnDestroy() {
  }
}
