// ==========================================
// CONFIGURAÇÃO
// ==========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000002);
scene.fog = new THREE.FogExp2(0x000002, 0.007);


// ==========================================
// CÂMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
    68,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

camera.position.set(0, 1.5, 28);


// ==========================================
// RENDER
// ==========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.5 : 1.7)
);

document
    .getElementById("canvasContainer")
    .appendChild(renderer.domElement);


// ==========================================
// UNIVERSO
// ==========================================

const mundo = new THREE.Group();

scene.add(mundo);


// ==========================================
// GALÁXIA
// ==========================================

function criarGalaxia() {

    const mobile =
        window.innerWidth < 700;

    const quantidade =
        mobile ? 22000 : 40000;

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            quantidade * 3
        );

    const colors =
        new Float32Array(
            quantidade * 3
        );

    const rosa =
        new THREE.Color("#ff59c7");

    const roxo =
        new THREE.Color("#783cff");

    const branco =
        new THREE.Color("#fff5ff");

    const raioMax = 13;
    const bracos = 5;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const i3 = i * 3;

        const raio =
            Math.pow(
                Math.random(),
                1.3
            )
            * raioMax;

        const braco =
            (i % bracos)
            / bracos
            * Math.PI
            * 2;

        const giro =
            raio * 0.75;

        const espalhamento =
            0.3 +
            raio * 0.09;


        positions[i3] =

            Math.cos(
                braco + giro
            )

            * raio

            +

            (Math.random() - 0.5)
            * espalhamento;


        positions[i3 + 1] =

            (Math.random() - 0.5)

            *

            (
                0.6 +
                raio * 0.05
            );


        positions[i3 + 2] =

            Math.sin(
                braco + giro
            )

            * raio

            +

            (Math.random() - 0.5)
            * espalhamento;


        let cor;


        if (raio < 2.5) {

            cor =
                branco
                    .clone()
                    .lerp(
                        rosa,
                        raio / 2.5
                    );

        } else {

            cor =
                rosa
                    .clone()
                    .lerp(
                        roxo,
                        raio / raioMax
                    );

        }


        colors[i3] = cor.r;
        colors[i3 + 1] = cor.g;
        colors[i3 + 2] = cor.b;
    }


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            size:
                mobile
                    ? 0.07
                    : 0.055,

            vertexColors: true,

            transparent: true,

            opacity: 0.95,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });


    const galaxia =
        new THREE.Points(
            geometry,
            material
        );


    galaxia.rotation.x =
        Math.PI * 0.39;

    galaxia.position.z = 0;

    mundo.add(galaxia);

    return galaxia;
}


const galaxia =
    criarGalaxia();


// ==========================================
// MEMÓRIAS
// ==========================================
//
// ESTA É A PARTE QUE VOCÊ VAI ALTERAR
// QUANDO QUISER COLOCAR NOVAS FOTOS.
//
// ==========================================

const memorias = [

    {
        foto: "fotos/foto1.jpg",

        titulo:
            "Onde tudo começou",

        data:
            "11 • 01 • 2026",

        texto:
            "Uma das primeiras páginas da nossa história."
    },

    {
        foto: "fotos/foto2.jpg",

        titulo:
            "Um dia especial",

        data:
            "27 • 10 • 2026",

        texto:
            "Um daqueles momentos que merecem ficar para sempre."
    },

    {
        foto: "fotos/foto3.jpg",

        titulo:
            "Nós",

        data:
            "19 • 04 • 2026",

        texto:
            "Entre tantas estrelas, eu escolheria você."
    },
    {
        "foto": "fotos/foto5.jpg",
        "data": "04 • 04 • 2026",
        "titulo": "O começo de nós ❤️",
"texto": "04 de abril foi o dia em que nós viramos oficialmente nós. E desde então, amar você tem sido uma das partes mais bonitas da minha vida."
    },
    {
        "foto": "fotos/foto6.jpg",
        "data": "09 • 04 • 2026",
        "titulo": "Nós, do nosso jeitinho",
        "texto": "Mais um daqueles momentos simples que, com você, acabam virando uma das minhas memórias favoritas. ✨"
    },
    {
        "foto": "fotos/foto7.jpg",
        "data": "03 • 05 • 2026",
        "titulo": "Mais uma página nossa",
        "texto": "Talvez fosse só mais um dia no calendário… mas estando com você, virou mais um pedacinho da nossa história. ❤️"
    }
];

// Basta preencher foto, data, titulo e texto; a ordem define a viagem.
const espacamentoMemorias = 30;
const ultimaMemoriaZ = -18 - (memorias.length - 1) * espacamentoMemorias;
const inicioFinal = 28 - ultimaMemoriaZ + 6;
const distanciaViagem = inicioFinal + 60;
function posicaoMemoria(index) {
    const z = -18 - index * espacamentoMemorias;
    const etapa = (28 - (z + 12)) / distanciaViagem;
    return {
        x: Math.sin(etapa * Math.PI * 3) * 2.2 + (index % 2 ? 1 : -1) * (innerWidth < 700 ? .65 : 2),
        y: 1.5 + Math.sin(etapa * Math.PI * 2) * .8 + .2,
        z
    };
}
// O destaque do pedido fica separado dos campos que precisam ser preenchidos.
function memoriaEspecial(memoria) { return memoria.foto === 'fotos/foto5.jpg'; }
const loader = new THREE.TextureLoader();
const objetosMemorias = [];
const legendas = document.getElementById('legendasMemorias');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const brilhoCanvas = document.createElement('canvas');
brilhoCanvas.width = brilhoCanvas.height = 128;
const ctx = brilhoCanvas.getContext('2d');
const gradiente = ctx.createRadialGradient(64,64,0,64,64,64);
gradiente.addColorStop(0, 'rgba(255,180,225,.45)');
gradiente.addColorStop(.5, 'rgba(164,100,220,.2)');
gradiente.addColorStop(1, 'rgba(164,100,220,0)');
ctx.fillStyle = gradiente;
ctx.fillRect(0,0,128,128);
const texturaBrilho = new THREE.CanvasTexture(brilhoCanvas);

memorias.forEach((memoria, index) => {
    loader.load(memoria.foto, textura => {
        textura.minFilter = THREE.LinearFilter;
        const proporcao = textura.image.width / textura.image.height;
        const largura = Math.min((innerWidth < 700 ? 3.2 : 4) * proporcao, innerWidth < 700 ? 3.3 : 5.5);
        const altura = largura / proporcao;
        const grupo = new THREE.Group();
        const posicao = posicaoMemoria(index);
        const especial = memoriaEspecial(memoria);
        grupo.position.set(posicao.x, posicao.y, posicao.z);
        const material = new THREE.MeshBasicMaterial({map:textura, transparent:true, opacity:0, depthWrite:false});
        const foto = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), material);
        grupo.add(foto);
        const brilhoMaterial = new THREE.SpriteMaterial({map:texturaBrilho, color:0xffb0e1, transparent:true, opacity:0, depthWrite:false});
        const brilho = new THREE.Sprite(brilhoMaterial);
        brilho.position.z = -.08;
        brilho.scale.set(largura * 1.65, altura * 1.65, 1);
        grupo.add(brilho);
        const pontos = new Float32Array((especial ? 36 : 24) * 3);
        for (let i=0; i<pontos.length/3; i++) {
            const angulo = i / (pontos.length/3) * Math.PI * 2;
            pontos[i*3] = Math.cos(angulo) * (largura/2 + .3 + Math.random()*.35);
            pontos[i*3+1] = Math.sin(angulo) * (altura/2 + .3 + Math.random()*.35);
            pontos[i*3+2] = .05;
        }
        const geometria = new THREE.BufferGeometry();
        geometria.setAttribute('position', new THREE.BufferAttribute(pontos,3));
        const particulasMaterial = new THREE.PointsMaterial({color:0xe9b3f4, size:.045, transparent:true, opacity:0, depthWrite:false});
        const particulas = new THREE.Points(geometria, particulasMaterial);
        grupo.add(particulas);
        mundo.add(grupo);
        const legenda = document.createElement('article');
        legenda.className = 'legendaMemoria' + (especial ? ' especial' : '');
        legenda.setAttribute('aria-hidden', 'true');
        const data = document.createElement('span');
        data.textContent = memoria.data;
        const titulo = document.createElement('h2');
        titulo.textContent = memoria.titulo;
        const texto = document.createElement('p');
        texto.textContent = memoria.texto;
        legenda.append(data,titulo,texto);
        legendas.append(legenda);
        objetosMemorias.push({grupo, material, brilhoMaterial, particulasMaterial, particulas, legenda, altura, memoria, index, especial});
    }, undefined, () => console.error('Erro carregando:', memoria.foto));
});
const quantidadeEstrelas =

    window.innerWidth < 700

        ? 3500

        : 6000;


const estrelasGeometry =
    new THREE.BufferGeometry();


const estrelasPositions =
    new Float32Array(
        quantidadeEstrelas * 3
    );


for (
    let i = 0;
    i < quantidadeEstrelas;
    i++
) {

    const i3 =
        i * 3;


    estrelasPositions[i3] =

        (Math.random() - 0.5)
        * 80;


    estrelasPositions[i3 + 1] =

        (Math.random() - 0.5)
        * 50;


    estrelasPositions[i3 + 2] =

        35

        -

        Math.random()
        * (distanciaViagem + 55);

}


estrelasGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        estrelasPositions,

        3

    )

);


const estrelasMaterial =
    new THREE.PointsMaterial({

        size: 0.055,

        color:
            0xffffff,

        transparent:
            true,

        opacity:
            0.75,

        depthWrite:
            false

    });


const estrelas =
    new THREE.Points(

        estrelasGeometry,

        estrelasMaterial

    );


scene.add(estrelas);



let entrou = false;
let progresso = 0, progressoAlvo = 0;
let olharX = 0, olharAlvoX = 0;
const entrada = document.getElementById('entrada');
const mensagemInicio = document.getElementById('mensagemInicio');
const instrucao = document.getElementById('instrucao');
const barra = document.getElementById('barraProgresso');
let introducaoEncerrada = false;
document.getElementById('btnEntrar').addEventListener('click', () => {
    if (entrou) return;
    entrou = true;
    entrada.classList.add('saindo');
    mensagemInicio.style.opacity = '1';
    setTimeout(() => { entrada.hidden = true; }, 1700);
});
function limitarProgresso() { progressoAlvo = THREE.MathUtils.clamp(progressoAlvo,0,1); }
window.addEventListener('wheel', event => {
    if (!entrou) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    progressoAlvo += delta * .052 / distanciaViagem;
    limitarProgresso();
}, {passive:true});
let tocando = false, touchX = 0, touchY = 0;
renderer.domElement.addEventListener('touchstart', event => {
    if (!entrou || event.touches.length !== 1) return;
    tocando = true;
    touchX = event.touches[0].clientX;
    touchY = event.touches[0].clientY;
}, {passive:true});
renderer.domElement.addEventListener('touchmove', event => {
    if (!entrou || !tocando || event.touches.length !== 1) return;
    const toque = event.touches[0];
    olharAlvoX = THREE.MathUtils.clamp(olharAlvoX + (toque.clientX-touchX)*.0035,-.8,.8);
    progressoAlvo -= (toque.clientY-touchY)*.1725 / distanciaViagem;
    limitarProgresso();
    touchX = toque.clientX;
    touchY = toque.clientY;
}, {passive:true});
for (const evento of ['touchend','touchcancel']) {
    renderer.domElement.addEventListener(evento, () => { tocando = false; }, {passive:true});
}
let mouseDown = false, mouseX = 0;
renderer.domElement.addEventListener('mousedown', event => {
    if (!entrou || event.button !== 0) return;
    mouseDown = true;
    mouseX = event.clientX;
});
window.addEventListener('mouseup', () => { mouseDown = false; });
window.addEventListener('blur', () => { mouseDown = false; tocando = false; });
window.addEventListener('mousemove', event => {
    if (!mouseDown || !entrou) return;
    olharAlvoX = THREE.MathUtils.clamp(olharAlvoX + (event.clientX-mouseX)*.003,-.8,.8);
    mouseX = event.clientX;
});
const alvoCamera = new THREE.Vector3();
const ancoraLegenda = new THREE.Vector3();
function atualizarCamera(delta) {
    progresso += (progressoAlvo-progresso) * (1-Math.exp(-3.4*delta));
    olharX += (olharAlvoX-olharX) * (1-Math.exp(-3.7*delta));
    camera.position.set(Math.sin(progresso*Math.PI*3)*2.2, 1.5+Math.sin(progresso*Math.PI*2)*.8, 28-progresso*distanciaViagem);
    alvoCamera.set(camera.position.x+olharX*8,camera.position.y,camera.position.z-15);
    camera.lookAt(alvoCamera);
    camera.updateMatrixWorld();
    barra.style.height = progresso*100+'%';
    instrucao.style.opacity = progresso > .04 ? '0' : '1';
    if (progresso > .07) introducaoEncerrada = true;
    mensagemInicio.style.opacity = entrou && !introducaoEncerrada ? 1-THREE.MathUtils.smoothstep(progresso,0,.07) : 0;
}
function animarMemorias(tempo) {
    for (const item of objetosMemorias) {
        const {grupo, index} = item;
        const posicao = posicaoMemoria(index);
        grupo.position.x = posicao.x;
        grupo.position.z = posicao.z;
        grupo.position.y = posicao.y + (reduzirMovimento ? 0 : Math.sin(tempo*1.2+index)*.12);
        grupo.quaternion.copy(camera.quaternion);
        grupo.rotateZ((index%2 === 0 ? -.035 : .035) + (reduzirMovimento ? 0 : Math.sin(tempo*.7+index)*.01));
        const distancia = camera.position.distanceTo(grupo.position);
        const frente = camera.position.z-posicao.z;
        // Desaparece antes de a camera atravessar a foto.
        const opacidade = entrou ? (1-THREE.MathUtils.smoothstep(distancia,10,25))*THREE.MathUtils.smoothstep(frente,5,10) : 0;
        grupo.visible = opacidade > .001;
        item.material.opacity = opacidade;
        item.brilhoMaterial.opacity = opacidade*(item.especial ? .95 : .65);
        item.particulasMaterial.opacity = opacidade*(item.especial ? .65 : .5);
        item.particulas.rotation.z = reduzirMovimento ? 0 : Math.sin(tempo*.25+index)*.04;
        if (!grupo.visible) { item.legenda.style.opacity = '0'; item.legenda.setAttribute('aria-hidden','true'); continue; }
        grupo.updateMatrixWorld(true);
        ancoraLegenda.set(0,-item.altura/2-.3,0);
        grupo.localToWorld(ancoraLegenda);
        ancoraLegenda.project(camera);
        const visivel = ancoraLegenda.z > -1 && ancoraLegenda.z < 1 && Math.abs(ancoraLegenda.x) < 1 && Math.abs(ancoraLegenda.y) < 1;
        item.legenda.style.transform = `translate(-50%, 0) translate(${(ancoraLegenda.x*.5+.5)*innerWidth}px, ${(-ancoraLegenda.y*.5+.5)*innerHeight}px)`;
        item.legenda.style.opacity = visivel ? opacidade * (1-THREE.MathUtils.smoothstep(distancia,13,21)) : 0;
        item.legenda.setAttribute('aria-hidden', visivel && opacidade > .1 ? 'false' : 'true');
    }
}
// Encerramento: a geometria e os arrays sao criados apenas uma vez.
const preludioFinal = document.getElementById('preludioFinal');
const mensagemFinal = document.getElementById('mensagemFinal');
const quantidadeCoracao = innerWidth < 700 ? 1100 : 1900;
const origemCoracao = new Float32Array(quantidadeCoracao * 3);
const destinoCoracao = new Float32Array(quantidadeCoracao * 3);
const posicoesCoracao = new Float32Array(quantidadeCoracao * 3);
const coresCoracao = new Float32Array(quantidadeCoracao * 3);
const rosaFinal = new THREE.Color('#f5a2cf');
const roxoFinal = new THREE.Color('#a77ee8');
for (let i = 0; i < quantidadeCoracao; i++) {
    const j = i * 3;
    const angulo = Math.random() * Math.PI * 2;
    const raio = i % 3 === 0 ? Math.sqrt(Math.random()) : .94 + Math.random() * .06;
    destinoCoracao[j] = Math.pow(Math.sin(angulo), 3) * raio;
    destinoCoracao[j+1] = (13*Math.cos(angulo)-5*Math.cos(2*angulo)-2*Math.cos(3*angulo)-Math.cos(4*angulo)) / 17 * raio;
    destinoCoracao[j+2] = (Math.random()-.5)*.1;
    origemCoracao[j] = (Math.random()-.5)*4;
    origemCoracao[j+1] = (Math.random()-.5)*3;
    origemCoracao[j+2] = (Math.random()-.5)*2;
    const cor = rosaFinal.clone().lerp(roxoFinal,Math.random()*.8);
    coresCoracao[j] = cor.r; coresCoracao[j+1] = cor.g; coresCoracao[j+2] = cor.b;
}
const geometriaCoracao = new THREE.BufferGeometry();
const atributoCoracao = new THREE.BufferAttribute(posicoesCoracao,3);
atributoCoracao.setUsage(THREE.DynamicDrawUsage);
geometriaCoracao.setAttribute('position',atributoCoracao);
geometriaCoracao.setAttribute('color',new THREE.BufferAttribute(coresCoracao,3));
const materialCoracao = new THREE.PointsMaterial({map:texturaBrilho, size:.1, vertexColors:true, transparent:true, opacity:0, depthWrite:false, fog:false, blending:THREE.AdditiveBlending});
const coracao = new THREE.Points(geometriaCoracao,materialCoracao);
coracao.visible = false;
coracao.frustumCulled = false;
scene.add(coracao);
const posicaoCoracao = new THREE.Vector3();
function mostrarTextoFinal(elemento, opacidade) {
    elemento.style.opacity = opacidade;
    elemento.setAttribute('aria-hidden',opacidade > .05 ? 'false' : 'true');
}
function animarFinal(tempo) {
    const etapa = entrou ? THREE.MathUtils.clamp((progresso*distanciaViagem-inicioFinal)/60,0,1) : 0;
    const suave = THREE.MathUtils.smoothstep;
    mostrarTextoFinal(preludioFinal,suave(etapa,0,.18)*(1-suave(etapa,.32,.48)));
    const formacao = suave(etapa,.35,.78);
    const revelacao = suave(etapa,.72,.96);
    mostrarTextoFinal(mensagemFinal,revelacao);
    estrelasMaterial.opacity = .75*(1-.7*suave(etapa,.15,.8));
    galaxia.material.opacity = .95*(1-.6*suave(etapa,.15,.8));
    coracao.visible = etapa > .35;
    if (!coracao.visible) return;
    materialCoracao.opacity = suave(etapa,.35,.52)*.9;
    for (let i=0; i<quantidadeCoracao; i++) {
        const j=i*3;
        const atraso = (i%11)/110;
        const mistura = suave(formacao,atraso,1);
        for (let eixo=0; eixo<3; eixo++) {
            posicoesCoracao[j+eixo] = THREE.MathUtils.lerp(origemCoracao[j+eixo],destinoCoracao[j+eixo],mistura);
        }
    }
    atributoCoracao.needsUpdate = true;
    const alturaVisivel = 2 * 18 * Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
    const larguraVisivel = alturaVisivel*camera.aspect;
    const paisagem = camera.aspect > 1.2;
    // Composicao em espaco 3D, com o texto ao lado ou abaixo no celular.
    posicaoCoracao.set(paisagem ? -larguraVisivel*.25 : 0,paisagem ? 0 : alturaVisivel*.28,-18);
    posicaoCoracao.applyQuaternion(camera.quaternion).add(camera.position);
    coracao.position.copy(posicaoCoracao);
    coracao.quaternion.copy(camera.quaternion);
    const escala = paisagem ? Math.min(larguraVisivel*.19,alturaVisivel*.34) : Math.min(larguraVisivel*.36,alturaVisivel*.18);
    coracao.scale.setScalar(escala*(reduzirMovimento ? 1 : 1+Math.sin(tempo*.65)*.012));
}
const clock = new THREE.Clock();
let tempo = 0;
function animar() {
    requestAnimationFrame(animar);
    const delta = Math.min(clock.getDelta(),.05);
    tempo += delta;
    if (document.hidden) return;
    atualizarCamera(delta);
    animarMemorias(tempo);
    animarFinal(tempo);
    if (!reduzirMovimento) {
        galaxia.rotation.y += delta*.021;
        galaxia.position.y = Math.sin(tempo*.35)*.15;
        estrelas.rotation.z = Math.sin(tempo*.05)*.02;
    }
    renderer.render(scene,camera);
}
animar();
window.addEventListener('resize', () => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700 ? 1.5 : 1.7));
});
