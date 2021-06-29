import React, { Component } from 'react';
import "./App.css";

class Main extends Component {
    render() {
        return (
            <div className='row'>
                <div className='leftColumn'>
                    <div className='car'>
                        {this.props.videos.map((video, key) => {
                            return(
                                <div key={key}>
                                    <small>{video.videoTitle}</small>
                                    <p onClick={() => this.props.changeVideo(video.videoHash, video.videoTitle)}>
                                        <video
                                            src={`https://ipfs.infura.io/ipfs/${video.videoHash}`}
                                            style={{width: '150px'}} />
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='rightColumn'>
                    <div className='car'>
                        <h3>Share Video</h3>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            const title = this.videoTitle.value;
                            this.props.uploadVideo(title);
                        }}>
                            &nbsp;
                            <div className="choose">
                                <input type='file' accept=".mp4, .mkv, .ogg, .wmv" onChange={this.props.captureFile} style={{width: '250px'}} />
                            </div>
                            
                            <br/><br/>
                            <input className="input-video"
                                id="videoTitle"
                                type="text"
                                ref={(input) => {this.videoTitle = input}}
                                placeholder="Title..."
                                required />
                                <br/><br/>
                            <button type="submit" className="btn btn-primary">Upload</button>
                            &nbsp;

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;