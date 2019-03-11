import * as React from 'react';
import fadeframe from 'src/resources/images/fade_frame.png';
interface BackgroundImageProps {
    backgroundImage: string;
    interactive: boolean;
    mousePos?: {x: number, y: number},
    className?: string;
}

class BackgroundImage extends React.Component<BackgroundImageProps> {
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement;
    private ctx: CanvasRenderingContext2D;
    private scaledImageWidth: number;
    public componentDidMount() {
        if (!this.props.interactive) {return;}
        const tempctx = this.canvas.getContext("2d");
        if (tempctx === null) { return;}
        this.ctx = tempctx;
        const w = window.innerWidth - (window.innerWidth < 550 ? 26 : 50);
        const h = window.innerHeight - (window.innerWidth < 550 ? 26 : 50);
        this.canvas.width = w;
        this.canvas.height = h;
        this.image = new Image();
        this.image.onload = () => {
            this.ctx.imageSmoothingEnabled = false;
            this.scaledImageWidth = Math.max(this.canvas.width, (this.canvas.height / this.image.height) * this.image.width);
            this.ctx.drawImage(this.image, 0,0, this.scaledImageWidth, this.canvas.height);
        }
        this.image.src= this.props.backgroundImage;
    }

    public componentWillReceiveProps(nextProps: BackgroundImageProps) {
        if (!this.props.interactive || !nextProps.mousePos) {return;}
        const x = nextProps.mousePos.x - this.canvas.getBoundingClientRect().left;
        const y = nextProps.mousePos.y - this.canvas.getBoundingClientRect().top;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, 0,0, this.scaledImageWidth, this.canvas.height);

        this.ctx.globalCompositeOperation='difference';
        this.ctx.fillStyle = 'red'; // '#ffd1d1';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 30, 0, 2*Math.PI);
        this.ctx.fill();
    }

    public render() {
        const { className} = this.props;
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
                src={this.props.backgroundImage} alt="background"
                className={"min-w-full xs:h-middle sm:h-middle " + (className === "nothing" && this.props.interactive ? "hidden" : "")}
                style={{
                    maxWidth: 'unset'
                }}
            />
            {this.props.interactive ? <canvas ref={c => c !== null ? this.canvas = c : null} className={"absolute pin z-10 " + ""}/> : null}
        </div>)
    }
}

export default BackgroundImage;