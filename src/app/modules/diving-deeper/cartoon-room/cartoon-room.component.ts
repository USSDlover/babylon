import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  Animatable, Color3,
  DirectionalLight,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene, SpotLight, StandardMaterial, UniversalCamera,
  Vector3
} from '@babylonjs/core';
import {Animations} from '../animations';

@Component({
  selector: 'app-animation',
  templateUrl: './cartoon-room.component.html',
  styleUrls: ['./cartoon-room.component.scss']
})
export class CartoonRoomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cartoon') cartoonCanvas: ElementRef | undefined;
  @HostListener('window:resize') onWindowResize = () => {
    this.renderTheScene();
  }

  babylonCanvas: HTMLCanvasElement | undefined;
  babylonEngine: Engine | undefined;

  scene: Scene | undefined;
  box: Mesh | undefined;
  animatable: Animatable | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.cartoonCanvas) {
      this.initTheEngine();
    }
  }

  initTheEngine() {
    this.babylonCanvas = this.cartoonCanvas?.nativeElement;
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
      const directionalLight = new DirectionalLight('DirectionalLight', new Vector3(0, -1, 0), this.scene);
      const hemisphericLight = new HemisphericLight('HemiLight', new Vector3(0, 1, -1), this.scene);

      directionalLight.intensity = 0.25;
      hemisphericLight.intensity = 0.5;

      const camera = new UniversalCamera('UniversalCamera', new Vector3(0, 3, -30), this.scene);

      const door = MeshBuilder.CreateBox('door', { width: 2, height: 4, depth: 0.1 }, this.scene);
      const hinge = MeshBuilder.CreateBox('hinge', {}, this.scene);

      hinge.isVisible = false;
      door.parent = hinge;
      hinge.position.y = 2;
      door.position.x = -1;

      const sphereLight = MeshBuilder.CreateSphere('sphere', {diameter: 0.2}, this.scene);
      sphereLight.material = new StandardMaterial('', this.scene);
      (sphereLight.material as any).emissiveColor = new Color3(1, 1, 1);
      sphereLight.position.x = 2;
      sphereLight.position.y = 3;
      sphereLight.position.z = 0.1;

      const sphereLights = [sphereLight];
      const lightPositions = [-2, 3, 6.9];

      for (let i = 0; i < 1; i++) {
        sphereLights.push(sphereLight.clone(''));
        sphereLights[i + 1].position = new Vector3(lightPositions[3*i], lightPositions[3*i +  1], lightPositions[3*i + 2]);

        const spotLights = [];
        const lightDirections = [-0.5, -0.25, 1, 0, 0, -1];

        for (let i = 0; i < sphereLights.length; i++) {
          spotLights[i] = new SpotLight('spotlight' + i, sphereLights[i].position, new Vector3(lightDirections[3*i], lightDirections[3*i + 1], lightDirections[3*i + 2]), Math.PI / 8, 5, this.scene);

          spotLights[i].diffuse = new Color3(1, 1, 1);
          spotLights[i].specular = new Color3(0.5, 0.5, 0.5);
          spotLights[i].intensity = 0;

          const frameRate = 20;
          const moveIn = Animations.getCameraMoving(frameRate);
          const rotate = Animations.getCameraRotate(frameRate);
          const sweep = Animations.getDoorSweeping(frameRate);
          const lightDimmer = Animations.getLightDimmer(frameRate);

          this.scene.beginDirectAnimation(camera, [moveIn, rotate], 0, 25 * frameRate, false);
          this.scene.beginDirectAnimation(hinge, [sweep], 0, 25 * frameRate, false);
          this.scene.beginDirectAnimation(spotLights[0], [lightDimmer], 0, 25 * frameRate, false);
          if (spotLights[1])
            this.scene.beginDirectAnimation(spotLights[1], [lightDimmer.clone()], 0, 25 * frameRate, false);

          this.createPeripheralsOfScene();
        }
      }
    }

    this.renderTheScene();
  }

  createPeripheralsOfScene() {
    const ground = MeshBuilder.CreateGround('ground', {width: 50, height: 50}, this.scene);

    const wall1 = MeshBuilder.CreateBox('wall1', {width: 8, height: 6, depth: 0.1}, this.scene);
    wall1.position.x = -6;
    wall1.position.y = 3;

    const wall2 = MeshBuilder.CreateBox('wall2', {width: 4, height: 6, depth: 0.1}, this.scene);
    wall2.position.x = 2;
    wall2.position.y = 3;

    const wall3 = MeshBuilder.CreateBox('wall3', {width: 2, height: 2, depth: 0.1}, this.scene);
    wall3.position.x = -1;
    wall3.position.y = 5;

    const wall4 = MeshBuilder.CreateBox('wall4', {width: 14, height: 6, depth: 0.1}, this.scene);
    wall4.position.x = -3;
    wall4.position.y = 3;
    wall4.position.z = 7;

    const wall5 = MeshBuilder.CreateBox('wall5', {width: 7, height: 6, depth: 0.1}, this.scene);
    wall5.rotation.y = Math.PI/2
    wall5.position.x = -10;
    wall5.position.y = 3;
    wall5.position.z = 3.5;

    const wall6 = MeshBuilder.CreateBox('wall6', {width: 7, height: 6, depth: 0.1}, this.scene);
    wall6.rotation.y = Math.PI/2
    wall6.position.x = 4;
    wall6.position.y = 3;
    wall6.position.z = 3.5;

    const roof = MeshBuilder.CreateBox('roof', {width: 14, height: 7, depth: 0.1}, this.scene);
    roof.rotation.x = Math.PI/2
    roof.position.x = -3;
    roof.position.y = 6;
    roof.position.z = 3.5;
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
