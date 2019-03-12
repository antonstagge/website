import * as React from 'react';
import fadeframe from 'src/resources/images/fade_frame.png';
interface BackgroundImageProps {
    backgroundImage: string;
    interactive: boolean;
    showTornado?: boolean;
    mousePos?: {x: number, y: number};
    className?: string;
    size?: {x: number, y:number};
}

interface BackgroundImageState {
    imageDone: boolean;
}

interface Vector {
    x:number;
    y:number;
}

class Particle {
    public z: number;
    public position: Vector;
    public radius: number;
    public offset: Vector;
    public speed: number;
    public color: string;
    public oldCenter: Vector;

    constructor(z:number) {
        this.position = {x:0, y:0};
        this.z = z;
        this.radius = Math.random()*2 + 3 + 6 * z;
        this.offset = {x: 0, y: 0};
        this.speed = Math.random()*0.04 + 0.01;
        this.oldCenter = {x:0, y:0};
        this.color = "#" + (Math.random() * 0x000033 + 0xff9000).toString(16).substr(0, 6);
    }
}

class BackgroundImage extends React.Component<BackgroundImageProps, BackgroundImageState> {
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement;
    private ctx: CanvasRenderingContext2D;
    private scaledImageWidth: number;

    private mousePos: Vector;
    private particles: Particle[];

    constructor(props: BackgroundImageProps) {
        super(props);
        this.state = {
            imageDone: false,
        }
    }

    public componentDidMount() {
        if (!this.props.interactive) {this.setState({imageDone: true});return;}
        const tempctx = this.canvas.getContext("2d");
        if (tempctx === null) { return;}
        this.ctx = tempctx;
        this.resizeCanvas();
        window.onresize = this.resizeCanvas;

        this.image = new Image();
        this.image.onload = () => {
            this.ctx.imageSmoothingEnabled = false;
            this.scaledImageWidth = Math.max(this.canvas.width, (this.canvas.height / this.image.height) * this.image.width);
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.image, 0,0, this.scaledImageWidth, this.canvas.height);
            this.setState({imageDone: true});
        }
        this.image.src= this.props.backgroundImage;
        this.mousePos = {x: this.canvas.width/2, y: this.canvas.height/2};
        this.particles = []

        const NUM_PARTICLES = 60;
        for (let i = 0; i< NUM_PARTICLES; ++i) {
            const p = new Particle(i/NUM_PARTICLES);
            this.particles.push(p);
        }
        this.ctx.globalCompositeOperation='difference';
        this.animate();
    }

    public componentWillReceiveProps(nextProps: BackgroundImageProps) {
        if (!this.props.interactive || !nextProps.mousePos) {return;}
        const mouseX = nextProps.mousePos.x - this.canvas.getBoundingClientRect().left;
        const mouseY = nextProps.mousePos.y - this.canvas.getBoundingClientRect().top;
        this.mousePos = {x: mouseX, y: mouseY};
    }

    public resizeCanvas = () => {
        if (this.props.size) {
            const w = this.props.size.x;
            const h = this.props.size.y;
            this.canvas.width = w// - (w < 576 ? 26 : 50);
            this.canvas.height = h// - (w < 576 ? 26 : 50) + 2;
        }
    }

    public line = (t: number) => {
        return {x: (1-t) * this.canvas.width/2 + t * this.mousePos.x, y: (1-t) * this.canvas.height/2 + t * this.mousePos.y}
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        if (this.props.className === "hidden") {return}
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, 0,0, this.scaledImageWidth, this.canvas.height);
        
        if (!this.props.showTornado) {return}
        const RADIUS = 100;
        for (let i = 0, len = this.particles.length; i < len; ++i) {
            const particle = this.particles[i]
            
            particle.offset.x += particle.speed;
            particle.offset.y += particle.speed;
            
            const newCenter = this.line(particle.z);

            const shiftX = (newCenter.x - particle.oldCenter.x) * particle.speed;
            const shiftY = (newCenter.y - particle.oldCenter.y) * particle.speed;
            
            this.ctx.fillStyle = particle.color;

            particle.position.x = particle.oldCenter.x + shiftX + Math.cos(particle.offset.x) * (RADIUS + particle.z * 50);
            particle.position.y = particle.oldCenter.y + shiftY + Math.sin(particle.offset.y) * (RADIUS + particle.z * 50);
            particle.oldCenter = {x: particle.oldCenter.x + shiftX, y: particle.oldCenter.y + shiftY};
            
            this.ctx.beginPath();
            this.ctx.arc(particle.position.x, particle.position.y, particle.radius, 0, 2*Math.PI);
            this.ctx.fill();
        }
    }

    public render() {
        const {interactive, className, backgroundImage} = this.props;
        console.log(className, backgroundImage)
        return (<div className={className + " relative "}>
            <img 
                src={fadeframe} alt="fadeframe"
                className="absolute z-20 w-full xs:h-middle sm:h-middle "
                style={{
                    opacity: 0.3,
                    pointerEvents: 'none'
                }}
            />
            <img 
                src={backgroundImage} alt="background"
                className={"min-w-full xs:h-middle sm:h-middle " + (className === "nothing" && interactive && this.state.imageDone ? "hidden" : "")}
                style={{
                    maxWidth: 'unset',
                }}
            />
            {interactive ? <canvas ref={c => c !== null ? this.canvas = c : null} className={"absolute pin z-10 " + ""}/> : null}
        </div>)
    }
}

export default BackgroundImage;