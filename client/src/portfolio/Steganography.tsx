import * as React from 'react';
import RadioButton from 'src/shared/RadioButton';
import Button from 'src/shared/Button';
import Dropzone from 'react-dropzone'
import { debounce } from 'ts-debounce';
import * as api from 'src/api/api';

enum DropType {
    Carrier,
    Secret,
    Extract,
}

interface SteganographyProps {
    className?:string;
}
interface SteganographyState {
    encrypt: boolean;
    carrier: File | null;
    secret: File | null;
    extract: File | null;
    n: string;
}
class Steganography extends React.Component<SteganographyProps, SteganographyState> {
    constructor(props: SteganographyProps) {
        super(props);
        this.state = {
            encrypt: true,
            carrier: null,
            secret: null,
            extract: null,
            n: "2",
        }

        this.conceal = debounce(this.conceal, 200)
    }

    public handleDrop = (accepted: File[], rejected: File[], type: DropType) => {
        if (accepted.length !== 0) {
            switch (type) {
                case DropType.Carrier:
                    this.setState({
                        carrier: accepted[0],
                    })
                    break;
                case DropType.Secret:
                    this.setState({
                        secret: accepted[0],
                    })
                    break;
                case DropType.Extract:
                    this.setState({
                        extract: accepted[0],
                    })
                    break;
            }
            
        } else if (rejected.length !== 0) {
            window.alert("File rejected. Has to be a PNG!");
        }
    }

    public conceal = () => {
        if (this.state.carrier !== null && this.state.secret !== null) {
            const fd = new FormData()
            fd.append("carrier", this.state.carrier)
            fd.append("secret", this.state.secret)

            api.post('conceal', fd, {headers: { 'content-type': 'multipart/form-data', 'level' : this.state.n }})
                .then(resp => {
                    console.log(resp);
                }, badResp => {
                    console.log(badResp);
                })
        }
    }

    public render() {
        const {className} = this.props;

        return <div className={" " + className}>
            <div className="flex justify-center">
                <RadioButton
                    className="flex-no-grow "
                    choices={["Conceal", "Extract"]}
                    defaultActive={0}
                    onChange={(choice:number) => this.setState({encrypt: !choice})}
                />
            </div>
            <div className="bg-black text-green-light p-4">
                <div>
                    Choose carrier PNG:
                    <Dropzone
                        accept="image/png"
                        multiple={false}
                        className="border border-green-light border-dashed text-sm p-1 cursor-pointer"
                        onDrop={(acc, rej) => this.handleDrop(acc, rej, DropType.Carrier)}
                    >
                        {this.state.carrier ? this.state.carrier.name : "Click to choose or drop a png here."}
                    </Dropzone>
                </div>
                <div>
                    <input type="number" value={this.state.n} onChange={(e) => this.setState({n: e.target.value})}/>
                </div>
                <div>
                    Choose secret PNG:
                    <Dropzone
                        accept="image/png"
                        multiple={false}
                        className="border border-green-light border-dashed text-sm p-1 cursor-pointer"
                        onDrop={(acc, rej) => this.handleDrop(acc, rej, DropType.Secret)}
                    >
                        {this.state.secret ? this.state.secret.name : "Click to choose or drop a png here."}
                    </Dropzone>
                </div>
                <div className="flex justify-center pt-2">
                    <Button
                        className="flex-no-grow border-green-light "
                        unvalidClassName=""
                        childHover={<div className="bg-green-light text-black px-2 py-1">Conceal</div>}
                        childNormal={<div className="text-green-light px-2 py-1">Conceal</div>}
                        valid={this.state.carrier !== null && this.state.secret !== null}
                        onClick={this.conceal}
                    />
                </div>
            </div>
        </div>
    }
}

export default Steganography;