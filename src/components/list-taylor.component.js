import React, { Component } from "react";
import TaylorDataService from "../services/taylor.service";
import '../styles/cards.css';
import '../styles/play.css'
import Taylor from "./taylor.component";
import ReactionsTaylorComponent from "./reactions-taylor.component";
import CommentsTaylorComponent from "./comments-taylor.component";

export default class TaylorList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTaylor = this.setActiveTaylor.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
    
        this.state = {
            taylors: [],
            currentTaylor: null,
            currentIndex: -1,
        };
    
        this.unsubscribe = undefined;
        }
    
        componentDidMount() {
        this.unsubscribe = TaylorDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
        }
    
        componentWillUnmount() {
        this.unsubscribe();
        }
    
        onDataChange(items) {
        let taylors = [];
    
        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            taylors.push({
            id: id,
            title: data.title,
            era: data.era,
            published: data.published,
            url: data.url,
            });
        });
    
        this.setState({
            taylors: taylors,
        });
        }
    
        refreshList() {
        this.setState({
            currentTaylor: null,
            currentIndex: -1,
        });
        }
    
        setActiveTaylor = (taylor) => {
        this.setState({
            currentClip: taylor,
        });
        };
    
        playVideo = (event) => {
        event.target.play();
        setTimeout(() => {
            event.target.pause();
            event.target.currentTime = 0;
        }, 5000);
        };
    
        render() {
        const { taylors, currentTaylor } = this.state;
    
        return (
            <><div className="contenedorDeMiniatura">
                <br />
                    <p>Please click on a Taylor songs...</p>
            {taylors.map((taylor) => (
                <div className="miniatura" key={taylor.title}>
                <div
                    className="card"
                    onClick={() => {
                    console.log("La tarjeta ha sido clickeada");
                    this.setActiveTaylor(taylor);
                    }}
                >
                    <div className="video-container">
                    <video
                        className="card-img-top video"
                        src={taylor.url}
                        muted
                        onMouseOver={(event) => event.target.play()}
                        controls={false}
                    >
                        Your browser does not support HTML5 video.
                    </video>
                    </div>
                </div>
                <h5 className="title">{taylor.title}</h5>
                        <ReactionsTaylorComponent/>
                        <CommentsTaylorComponent/>
                </div>
            ))}
            </div>
            <div className="reproductorVideo">
                {currentTaylor ? (
                <Taylor
                    taylor={currentTaylor}
                    refreshList={this.refreshList}
                    key={currentTaylor.id} 
                />
                ) : (
                <div>
                </div>
                )}
            </div></>
        );
        }
    }