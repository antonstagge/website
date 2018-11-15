import * as React from 'react';
import RadioButton from 'src/shared/RadioButton';
import Button from 'src/shared/Button';
import Dropzone from 'react-dropzone'
// import { debounce } from 'ts-debounce';
// import * as api from 'src/api/api';

enum DropType {
    Carrier = 'carrier',
    Secret = 'secret',
    Extract = 'extraction',
}

interface SteganographyProps {
    className?:string;
}
interface SteganographyState {
    conceal: boolean;
    carrier: string | null;
    secret: string | null;
    extract: string | null;
    result: string | null;
    error: string | null;
}
class Steganography extends React.Component<SteganographyProps, SteganographyState> {
    private carrierImg: HTMLImageElement | null = null;
    private secretImg: HTMLImageElement | null = null;
    private extractImg: HTMLImageElement | null = null;
    constructor(props: SteganographyProps) {
        super(props);
        this.state = {
            conceal: true,
            carrier: null,
            secret: null,
            extract: null,
            result: null,
            error: null,
        }
    }

    public handleDrop = (accepted: File[], rejected: File[], type: DropType) => {
        if (accepted.length !== 0) {
            const reader = new FileReader()
            reader.readAsDataURL(accepted[0]);
            let saveImgSrcToState = () => {/**/}
            switch (type) {
                case DropType.Carrier:
                    saveImgSrcToState = () => {
                        if (reader.result !== null) {
                            this.setState({carrier: reader.result as string})
                        }
                    }
                    break;
                case DropType.Secret:
                    saveImgSrcToState = () => {
                        if (reader.result !== null) {
                            this.setState({secret: reader.result as string})
                        }
                    }
                    break;
                case DropType.Extract:
                    saveImgSrcToState = () => {
                        if (reader.result !== null) {
                            this.setState({extract: reader.result as string})
                        }
                    }
                    break;
            }
            reader.onload = saveImgSrcToState;
        } else if (rejected.length !== 0) {
            window.alert("File rejected. Has to be a jpeg or png.");
        }
    }

    public toImageData = (image: HTMLImageElement): ImageData => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        context.drawImage(image, 0, 0 );
        return context.getImageData(0, 0, canvas.width, canvas.height);
    }

    public toImageSource = (data: ImageData): string => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = data.width;
        canvas.height = data.height;
        context.putImageData(data, 0, 0);
        return canvas.toDataURL('image/png');
    }
    public getArrayIndex = (x:number, y:number, width:number) => {
        return y * (width * 4) + x * 4;
    }

    public conceal = () => {
        if (this.state.carrier === null || this.state.secret === null
            || this.carrierImg === null || this.secretImg === null) {
            return;
        }

        const carrierData = this.toImageData(this.carrierImg);
        const secretData = this.toImageData(this.secretImg);
        if (secretData.width > carrierData.width || secretData.height > carrierData.height) {
            this.setState({error: "The secret image can not be larger than the carrier image either both width and height."});
            return;
        }
        
        const hiddenData = new ImageData(carrierData.width, carrierData.height)
        for (let x = 0; x < hiddenData.width; x += 1) {
            for (let y = 0; y < hiddenData.height; y += 1) {
                const redIndex = this.getArrayIndex(x, y, hiddenData.width);
                if (x < secretData.width && y < secretData.height) {
                    const secretIndex = this.getArrayIndex(x, y, secretData.width);
                    for (let c = 0; c < 3; c += 1) {
                        const clean = (carrierData.data[redIndex + c] & 248);
                        const prepared = (secretData.data[secretIndex + c] >> 5);
                        const val = (clean | prepared);
                        hiddenData.data[redIndex + c] = val;
                    }
                    hiddenData.data[redIndex + 3] = 255;
                } else {
                    for (let c = 0; c < 4; c += 1) {
                        hiddenData.data[redIndex + c] = carrierData.data[redIndex + c];
                    }
                }
            }
        }
        this.setState({result: this.toImageSource(hiddenData), error: null});
    }

    public extract = () => {
        if (this.state.extract === null || this.extractImg === null) {
            return;
        }
        const extractData = this.toImageData(this.extractImg);
        const resultData = new ImageData(extractData.width, extractData.height)
        for (let x = 0; x < resultData.width; x += 1) {
            for (let y = 0; y < resultData.height; y += 1) {
                const redIndex = this.getArrayIndex(x, y, resultData.width);
                    for (let c = 0; c < 3; c++) {
                        resultData.data[redIndex + c] = (extractData.data[redIndex + c] & (255 - 248)) << 5;
                    }
                    resultData.data[redIndex + 3] = 255;
            }
        }
        this.setState({result: this.toImageSource(resultData), error: null});
    }

    public imageUpload = (type: DropType, className?:string) => {
        let imgSrc: string | null = "";
        switch(type) {
            case DropType.Carrier:
                imgSrc = this.state.carrier;
                break;
            case DropType.Secret:
                imgSrc = this.state.secret;
                break;
            case DropType.Extract:
                imgSrc = this.state.extract;
                break;
        }
        return <div className={"flex-no-grow w-1/2 h-32" + " " + className}>
            <Dropzone
                accept="image/png, image/jpeg"
                multiple={false}
                className="h-full border border-green-light border-dashed text-sm p-1 cursor-pointer"
                onDrop={(acc, rej) => this.handleDrop(acc, rej, type)}
            >
                    {imgSrc !== null
                        ? <img src={imgSrc} alt="secret" 
                            className="h-full text-center block mr-auto ml-auto"
                            ref={(ref) => {
                                switch(type) {
                                    case DropType.Carrier:
                                        this.carrierImg = ref;
                                        break;
                                    case DropType.Secret:
                                        this.secretImg = ref;
                                        break;
                                    case DropType.Extract:
                                        this.extractImg = ref;
                                        break;
                                }
                            }}
                        />
                        : <div className="absolute pin-t pin-x pt-12 text-center">
                            Click to pick {type} image 
                        </div>
                    }
            </Dropzone>
        </div>
    }

    public render() {
        const {className} = this.props;
        const valid = (this.state.conceal ? (this.state.carrier !== null && this.state.secret !== null) : (this.state.extract !== null))

        return <div className="">
            <div className="flex flex-wrap-reverse pt-10 -ml-4">
                <div className={"flex-1 flex flex-col xs:text-lg sm:text-xl ml-4" + className}>
                    <div className="flex-no-grow flex items-end">
                        <RadioButton
                            className="flex-no-grow "
                            choices={["Conceal", "Extract"]}
                            defaultActive={0}
                            onChange={(choice:number) => this.setState({conceal: !choice})}
                        />
                    </div>
                    <div className="flex-1 bg-black text-green-light p-4">
                        <div className="flex justify-center">
                            {this.state.conceal ? this.imageUpload(DropType.Carrier, "mr-2") : this.imageUpload(DropType.Extract)}
                            {this.state.conceal ? this.imageUpload(DropType.Secret) : null}
                        </div>
                        <div className="flex justify-between pt-2">
                            <div className="text-sm">
                                {this.state.error}
                            </div>
                            <div className="flex-no-grow">
                                <Button
                                    className="flex-no-grow border-green-light "
                                    unvalidClassName=""
                                    childHover={<div className="bg-green-light text-black px-2 py-1">{this.state.conceal ? "Conceal" : "Extract"}</div>}
                                    childNormal={<div className="text-green-light px-2 py-1">{this.state.conceal ? "Conceal" : "Extract"}</div>}
                                    valid={valid}
                                    onClick={() => this.state.conceal ? this.conceal() : this.extract()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 ml-4">
                    <div className="xs:text-xl sm:text-3xl text-grey-dark pb-4">Steganography</div>
                    <div className=" pb-4">
                        <p>
                            Steganography is the art and science of hiding secret data within other data,
                            known as the carrier. Here you can upload two images, and the secret image will 
                            be hidden within the carrier image. Or you can upload a single image to extract 
                            any secret images hidden within. Try it out!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center bg-black text-green-light p-4 mt-4">
                <div className="flex-1 text-center border border-green-light border-dashed text-sm">
                    {this.state.result !== null
                        ?<img
                            src={this.state.result}
                            alt="result"
                        />
                        : <div className="p-2">Result will be displayed here</div>
                    }
                </div>
            </div>
        </div>
    }
}

export default Steganography;