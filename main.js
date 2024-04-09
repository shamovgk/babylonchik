const canvas = document.getElementById("renderCanvas"); // Получаем элемент холста
const engine = new BABYLON.Engine(canvas, true);// Создание движка BABYLON 3D

// создание сцены
const createScene = function () {

    const scene = new BABYLON.Scene(engine);
    // создание камеры и света
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    //создание материалов
    const material = new BABYLON.StandardMaterial("name", scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");

    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set

    // создание коробки
    const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});
    box.position.y = 0.5;
    // создание крыши
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    // создание земли
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    //задача материала
    ground.material = groundMat; // Помещаем материальное свойство земли
    roof.material = roofMat;
    box.material = boxMat;
    return scene;
};

const scene = createScene(); // Вызов функции createScene

// Регистрируем цикл рендеринга для многократного рендеринга сцены
engine.runRenderLoop(function () {
        scene.render();
});

// Следим за событиями изменения размера браузера / холста
window.addEventListener("resize", function () {
        engine.resize();
});
