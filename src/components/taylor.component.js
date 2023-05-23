import React, { Component } from "react";
import TaylorDataService from "../services/taylor.service";
import ReactionsTaylorComponent from "./reactions-taylor.component";
import CommentsTaylorComponent from "./comments-taylor.component";
import '../styles/taylor.css'

export default class Taylor extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeEra = this.onChangeEra.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTaylor = this.updateTaylor.bind(this);
        this.deleteTaylor = this.deleteTaylor.bind(this);

        this.state = {
        currentTaylor: {
            id: null,
            title: "",
            era: "",
            published: false
        },
        message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { taylor } = nextProps;
        if (prevState.currentTaylor.id !== taylor.id) {
        return {
            currentTaylor: taylor,
            message: ""
        };
        }

        return prevState.currentTaylor;
    }

    componentDidMount() {
        this.setState({
        currentTaylor: this.props.taylor,
        });
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
        return {
            currentTaylor: {
            ...prevState.currentTaylor,
            title: title,
            },
        };
        });
    }

    onChangeEra(e) {
        const era = e.target.value;

        this.setState((prevState) => ({
        currentTaylor: {
            ...prevState.currentTaylor,
            era: era,
        },
        }));
    }

    updatePublished(status) {
        TaylorDataService.update(this.state.currentTaylor.id, {
        published: status,
        })
        .then(() => {
            this.setState((prevState) => ({
            currentTaylor: {
                ...prevState.currentTaylor,
                published: status,
            },
            message: "The status was updated successfully!",
            }));
        })
        .catch((e) => {
            console.log(e);
        });
    }

    updateTaylor() {
        const data = {
        title: this.state.currentTaylor.title,
        era: this.state.currentTaylor.era,
        };

        TaylorDataService.update(this.state.currentTaylor.id, data)
        .then(() => {
            this.setState({
            message: "The taylor song was updated successfully!",
            });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    deleteTaylor() {
        TaylorDataService.delete(this.state.currentTaylor.id)
        .then(() => {
            this.props.refreshList();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { currentTaylor } = this.state;
    
        return (
            <div className="clip-container">
                <div class="clip">
                {currentTaylor ? (
                    <div className="edit-form">
                    <form>
                        <div class="video-container">
                        <video controls>
                            <source src={currentTaylor.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </div>
                    </form>
                    </div>
        
                ) : (
                    <div>
                    <br />
                    <p>Please click on a Taylors song...</p>
                    </div>
                )}
                </div>
            </div>
            );
        }
}
