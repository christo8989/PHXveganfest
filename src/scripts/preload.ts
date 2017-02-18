/// <reference path="./jquery/jquery.d.ts" />

export class PreLoad {
    public init = (): void => {
        setTimeout((): void => {
            let $images = $('img[data-src]');
            var images = [];
            $.each($images, function (i, image) {
                let $image = $(image);
                let src = $image.data('src');
                images[i] = new Image();
                images[i].src = src;
                images[i].onload = (): void => {
                    setTimeout((): void => {
                        $image.attr('src', src);
                    }, 0);
                };
            });
        }, 0);
    }
}