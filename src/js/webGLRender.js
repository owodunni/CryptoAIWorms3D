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
        var geometry = new three.BoxGeometry(0.1, 0.1, 0.1);
        //var material = new three.MeshNormalMaterial();
        /* * /
        var material = new three.MeshBasicMaterial({
            color: 0x00ff00
        });
        /* */
        /* */
        three.ImageUtils.crossOrigin = '';

        var material = [];
        for (var i = 0; i < 9; i++)
            material.push(new three.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            }));

        var group = new three.Group();
        group.rotation.x = Math.PI / 4;
        group.rotation.y = Math.PI / 4;

        var cube = new three.Mesh(geometry, material)
        cube.translateX(0.2);
        group.add(cube);

        var cube = new three.Mesh(geometry, material)
        cube.translateX(-0.2);
        group.add(cube);

        scene.add(group);

        camera.position.z = 5;

        /* */

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

                group.quaternion.multiplyQuaternions(deltaRotationQuaternion, group.quaternion);
            }

            previousMousePosition = {
                x: e.offsetX,
                y: e.offsetY
            };
        };
        this.canvas.onwheel = function (e) {
            var deltaZ = e.wheelDelta / 100;
            if (camera.position.z + deltaZ < 0) {
                camera.position.z = 0
            }
            else if (camera.position.z + deltaZ > 14) {
                camera.position.z = 14;
            }else{
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