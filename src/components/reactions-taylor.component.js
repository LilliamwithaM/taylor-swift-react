import React from "react";
import '../styles/taylor.css'
import KafkaService from "../services/kafka.service";

function ReactionsTaylorComponent() {
    return (
        <div class="reactions">
        <button onClick={(e) => {
                    e.preventDefault();
                    saveLike(e, 1)
                      
                    }
                } >
                 Love
              </button>
        <div class="reaction reaction-like"></div>
        <div class="reaction reaction-love"></div>
        <div class="reaction reaction-haha"></div>
        <div class="reaction reaction-wow"></div>
        <div class="reaction reaction-sad"></div>
        <div class="reaction reaction-angry"></div>
        </div>
    );
}

function saveLike(e, status) {
  
    let data = {
      id: 0,
      status: status
    };
 
    console.log(JSON.stringify(data));
 
    KafkaService.reaction("i-love-adsoftsito");
    e.preventDefault();
}


export default ReactionsTaylorComponent;