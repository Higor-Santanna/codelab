import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlyrLayout, plyrLayoutIcons } from "@vidstack/react/player/layouts/plyr";

type VideoPlayerProps = {
    videoId: string;
    autoplay: boolean;
}

const VideoPlayer = ({ videoId, autoplay }: VideoPlayerProps) => {
    const userAlreadyInteracted = navigator.userActivation.hasBeenActive; //Pega se o usuário já iteragiu com a página.

    return (
        <MediaPlayer title="Vídeo aula" src={`youtube/${videoId}`} autoPlay={autoplay && userAlreadyInteracted}>
            <MediaProvider />
             <PlyrLayout icons={plyrLayoutIcons} />
        </MediaPlayer>
    )
}

export default VideoPlayer

//Esse componente é criado por causa de algumas importações que são dinâmicas, necessárias para os seu funcionamento.
//Dentro da lógica do autoplay caso o usuário tenha interagido com a página, o vídeo irá se reproduzir de forma automática, caso ele não iteraja ele não se reproduz. 