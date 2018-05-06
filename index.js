function EventExposure() {}

EventExposure.create = function(container) {
    MouseEventExposure.create(container);
};

function MouseEventExposure() {}

MouseEventExposure.create = function(container) {
    const listenerProperty = [
        {
            preventDefault: false, stopPropagation: false,
            style: { "background-color": "#008", "color": "white", }
        },
        {
            preventDefault: false, stopPropagation: false,
            style: { "background-color": "#800", "color": "white", }
        },
        {
            preventDefault: false, stopPropagation: false,
            style: { "background-color": "#080", "color": "white", }
        },
        {
            preventDefault: false, stopPropagation: false,
            style: { "background-color": "#AA0", "color": "black", }
        },
    ];
    let listeners = listenerProperty.map(()=>{
        return $("<div/>").addClass("listener");
    });
    listeners.forEach( (je, index) => {
        let style = listenerProperty[index].style;
        Object.keys(style).forEach( name => {
            je.css(name, style[name]);
        });
        let preventDefault = event => {
            let input = je.find(".togglePreventDefault");
            $(event.target).parent().css("color",
                input.prop("checked") ? "red" : "#ddd");
            event.stopPropagation();
        };
        let stopPropagation = event => {
            let input = je.find(".toggleStopPropagation");
            $(event.target).parent().css("color",
                input.prop("checked") ? "red" : "#ddd");
            event.stopPropagation();
        };
        let name = "#Div" + (index + 1);
        ( index <= 0 ? $(container) : listeners[ index - 1 ] )
            .append(je.append(
                $("<div/>").addClass("indicator panel")
                .append($("<div/>").addClass("caption").html(name+": "))
                .append($("<label/>").append(
                    $("<input/>").attr("type", "checkbox")
                    .addClass("togglePreventDefault")
                    .click(preventDefault))
                    .append($("<span/>").html("preventDefault")))
                .append($("<label/>").append(
                    $("<input/>").attr("type", "checkbox")
                    .addClass("toggleStopPropagation")
                    .click(stopPropagation))
                    .append($("<span/>").html("stopPropagation")))
                .append($("<br/>"))
                .append($("<div/>").addClass("event mouseover").html("over"))
                .append($("<div/>").addClass("event mouseout").html("out"))
                .append($("<div/>").addClass("event mouseenter").html("enter"))
                .append($("<div/>").addClass("event mouseleave").html("leave"))
                .append($("<div/>").addClass("event mousemove").html("move"))
                .append($("<div/>").addClass("event mousedown").html("down"))
                .append($("<div/>").addClass("event mouseup").html("up"))
                .append($("<div/>").addClass("event click").html("click"))
            ));

        let logger = event => {
            let name = event.type;
            let $tgt = je.find(">.indicator.panel>.event." + name);
            $tgt.css("background-color", "yellow").css("color", "black");
            setTimeout( ()=> {
                $tgt.css("background-color", "red").css("color","white");
                setTimeout( ()=> {
                    $tgt.css("background-color", "#c00");
                    setTimeout( ()=> {
                        $tgt.css("background-color", "#800");
                        setTimeout( ()=> {
                            $tgt.css("background-color", "#400");
                            setTimeout( ()=> {
                                $tgt.css("background-color", "black");
                            }, 200);
                        }, 100);
                    }, 50);
                }, 40);
            }, 10);
            if(je.find(".togglePreventDefault").prop("checked")) {
                event.preventDefault();
            }
            if(je.find(".toggleStopPropagation").prop("checked")) {
                event.stopPropagation();
            }
        };
        je.get(0).addEventListener("mouseover", logger);
        je.get(0).addEventListener("mouseout", logger);
        je.get(0).addEventListener("mouseenter", logger);
        je.get(0).addEventListener("mouseleave", logger);
        je.get(0).addEventListener("mousemove", logger);
        je.get(0).addEventListener("mousedown", logger);
        je.get(0).addEventListener("mouseup", logger);
        je.get(0).addEventListener("click", logger);
    });
    $(".listener")
        .css("margin", "20px").css("padding", "10px")
        .css("width", "calc(100% - 60px)").css("height", "calc(100% - 100px)")
    $(".listener .indicator.panel > div").css("display", "inline-block");
    $(".listener .indicator>.event").css("width", "50px")
        .css("font-size", "8pt")
        .css("background-color", "black").css("color", "white")
        .css("text-align", "center").css("margin", "0 3px");
    $(".listener label").css("color", "#ddd");
};
