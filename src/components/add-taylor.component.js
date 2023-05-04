import React, { Component } from "react";
import TaylorDataService from "../services/taylor.service";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "../styles/add-taylor.css";

export const storage = firebase.storage();

export default class AddTaylor extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeEra = this.onChangeEra.bind(this);
        this.saveTaylor = this.saveTaylor.bind(this);
        this.newTaylor = this.newTaylor.bind(this);

        this.state = {
        title: "",
        era: "",
        published: false,
        submitted: false,
        file : null,
        url: "",
        uploadProgress: 0
        };
    }

    onChangeFile(e) {
        console.log(e.target.files[0]);
        this.setState({
            file : e.target.files[0],
        })
    }

    handleUpLoad(e, file) {
        e.preventDefault();
        const uploadTask = storage.ref('/debut/' + file.name).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({
                uploadProgress: progress
                });
            },
            console.error,
            () => {
                storage
                .ref("debut")
                .child(file.name)
                .getDownloadURL()
                .then((myurl) => {
                    this.setState({
                    url: myurl
                    }, () => {
                    if (this.state.url !== "") {
                        this.saveTaylor();
                    }
                    });
                });
            }
            );
        }

        saveTaylor() {
            this.setState({
              loading: true, // establecer loading en verdadero al iniciar la carga
              message: "" // borrar cualquier mensaje previo
            });
        
            let data = {
                title: this.state.title,
                era: this.state.era,
                published: false,
                url: this.state.url // asignar la URL al objeto 'data'
                };
            
                TaylorDataService.create(data)
                .then(() => {
                    console.log("Created new Taylors song successfully!");
                    this.setState({
                    loading: false, // establecer loading en falso al completar la carga
                    submitted: true,
                    message: "The clip was uploaded successfully.",
                    progress: 0 // restablecer la barra de progreso
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeEra(e) {
        this.setState({
        era: e.target.value,
        });
    }

    newTaylor() {
        this.setState({
        title: "",
        era: "",
        published: false,
        submitted: false,
        url: ""
        });
    }

    render() {
        return (
            <div className="submit">
                {this.state.submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn-success" onClick={this.newClip}>
                    Add
                    </button>
                </div>
                ) : (
                <div>
                    <div className="form">
                    <label htmlFor="title">Title song</label>
                    <input
                        type="text"
                        className="form-title"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        name="title"
                    />
                    </div>
        
                    <div className="form">
                    <label htmlFor="era">Era</label>
                    <input
                        type="text"
                        className="form-era"
                        id="era"
                        required
                        value={this.state.era}
                        onChange={this.onChangeEra}
                        name="era"
                    />
                    </div>
        
                    <div>
                    <form
                        onSubmit={(event) => {
                        this.handleUpLoad(event, this.state.file);
                        }}
                    >
                        <input
                        type="file"
                        onChange={(event) => {
                            this.onChangeFile(event);
                        }}
                        />
                        <button disabled={!this.state.file}>Agregar</button>
                    </form>
                    {/* mostrar estado de carga */}
                    {this.state.uploadProgress > 0 && (
                        <div>Subiendo video: {this.state.uploadProgress}%</div>
                    )}
                    <img src={this.state.url} alt="" />
                    </div>
        
                </div>
                )}
            </div>
            );
        }
}