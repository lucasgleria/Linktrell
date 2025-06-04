// js/utils/device-detector.js
// Módulo utilitário para detectar o tipo de dispositivo (mobile, tablet, desktop).

/**
 * Detecta o tipo de dispositivo com base na User Agent string e na largura da tela.
 * @returns {string} O tipo de dispositivo: 'Mobile', 'Tablet', ou 'Desktop'.
 */
export function getDeviceType() {
    const ua = navigator.userAgent;
    const width = window.innerWidth;

    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thc|501i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|s )|al(av|ca|co)|amoi|an(d|on)|az(fo|hp|fl)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(is|eo)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(ad|pi)|em(l|ul)|er(ic|k0)|esl |ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(| |_|a|g|p|s)|tf|wf)|ibi|ipaq|iq(mo|yr)|isg|jinsi|kddi|keji|kgt|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|ad|gr|ha|mm|ne|nv|on|tf|us|vl)|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-up|po(ck|rt|se)|prox|psio|pt\-ar|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|pn|tf)|sh(mo|ow)|si(em|mm)|sk\-0|smar|sy(01|mb)|t2(18|50)|t6(00|10|40)|tb(ad|un)|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|mp)|uecker|un(go|lb)|us(ca|vl)|utis|vago|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|\-in|zte\-/i.test(ua.substr(0,4))) {
        return 'Mobile';
    }

    // Heurística simples para tablet baseada na largura da tela e User Agent
    // Pode ser mais sofisticado, mas serve para a maioria dos casos.
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua) || (width >= 768 && width <= 1024)) {
        return 'Tablet';
    }

    return 'Desktop';
}
