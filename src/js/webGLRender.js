const three = THREE;
var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

var renderer = null;
var scene = null;
var camera = null;


var group = new three.Group();
group.rotation.x = Math.PI / 4;
group.rotation.y = Math.PI / 4;

class WebGLRender {
    constructor(canvas) {

        this.canvas = canvas;
        scene = new three.Scene();
        camera = new three.PerspectiveCamera(
            30,
            canvas.width / canvas.height,
            0.1,
            1000);

        renderer = new three.WebGLRenderer({ canvas: canvas });
    }

    init() {

        three.ImageUtils.crossOrigin = '';

        this.foodMaterial = [];
        for (var i = 0; i < 9; i++)
            this.foodMaterial.push(new three.MeshLambertMaterial({
                color: 0x34eb8f,
            }));

        this.wormMaterial = [];
        for (var i = 0; i < 9; i++)
            this.wormMaterial.push(new three.MeshLambertMaterial({
                color: 0xeb3d34,
            }));

        scene.add(new THREE.AmbientLight(0x404040));

        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(100, 350, 250);
        directionalLight.castShadow = false;
        scene.add(directionalLight);

        scene.add(group);

        camera.position.z = 5;

        this.canvas.onmousedown = function (e) {
            //console.log(e);
            isDragging = true;
        };
        this.canvas.onmousemove = function (e) {
            //console.log(e);
            var deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            if (isDragging) {

                var deltaRotationQuaternion = new three.Quaternion()
                    .setFromEuler(new three.Euler(
                        toRadians(deltaMove.y * 1),
                        toRadians(deltaMove.x * 1),
                        0,
                        'XYZ'
                    ));

                group.quaternion.multiplyQuaternions(
                    deltaRotationQuaternion,
                    group.quaternion);
            }

            previousMousePosition = {
                x: e.offsetX,
                y: e.offsetY
            };
        };
        this.canvas.onwheel = function (e) {
            var deltaZ = e.wheelDelta / 300;
            if (camera.position.z + deltaZ < -3) {
                camera.position.z = -3
            }
            else if (camera.position.z + deltaZ > 14) {
                camera.position.z = 14;
            } else {
                camera.position.z += deltaZ;
            }
            return false;
        }

        $(document).on('mouseup', function (e) {
            isDragging = false;
        });

        // shim layer with setTimeout fallback
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        draw();
        update(0, totalGameTime);
    }
    initializeObj(gameObjs) {
        var geometry = new three.BoxGeometry(3 / 256.0, 3 / 256.0, 3 / 256.0);

        gameObjs.forEach(gameObj => {
            var cube = null;
            if (gameObj instanceof Food) {
                cube = new three.Mesh(geometry, this.foodMaterial);
            }
            else {
                cube = new three.Mesh(geometry, this.wormMaterial)
            }
            cube.translateX(gameObj.x / 256);
            cube.translateY(gameObj.y / 256);
            cube.translateZ(gameObj.z / 256);

            gameObj.cube = cube;

            group.add(cube);
        });
    }

    updateObjects(gameObjs) {
        gameObjs.forEach(gameObj => {
            if (gameObj instanceof Worm) {
                gameObj.cube.position.set(0, 0, 0);
                gameObj.cube.translateX(gameObj.x / 256);
                gameObj.cube.translateY(gameObj.y / 256);
                gameObj.cube.translateZ(gameObj.z / 256);
            }
        });

    }
}

function draw() {
    renderer.render(scene, camera);
    requestAnimFrame(draw);
}


function update(dt, t) {

    setTimeout(function () {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;

        update(dt, totalGameTime);

        lastFrameTime = currTime;
    }, 0);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}