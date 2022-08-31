
function pasarSegundoPaso(thisCard) 
{
    $("#card-paso-2").show();

    if ($(".step1").hasClass("active")) {
        $(".step1").removeClass("active")
        $(".step1").addClass("completed");
        $(".step2").addClass("active");
    }
    toggleExpandCard(thisCard, "card-paso-2");
}

function pasarTercerPaso(thisCard) 
{
    $("#card-paso-3").show();

    if ($(".step2").hasClass("active")) {
        $(".step2").removeClass("active");
        $(".step2").addClass("completed");
        $(".step3").addClass("active");
    }

    toggleExpandCard(thisCard, "card-paso-3");
}

function volverPaso1(thisCard) 
{
    $("#card-paso-1").show();

    if ($(".step2").hasClass("active")) {
        $(".step2").removeClass("active");
        $(".step2").removeClass("completed");
        $(".step1").addClass("active");
    }

    toggleExpandCard(thisCard, "card-paso-1");
}

function volverPaso2(thisCard) 
{
    $("#card-paso-2").show();

    if ($(".step3").hasClass("active")) {
        $(".step3").removeClass("active")
        //$(".step3").addClass("completed");
        $(".step2").addClass("active");
    }
    toggleExpandCard(thisCard, "card-paso-2");
}

function resetearPasos(thisCard) 
{    
    $("#card-paso-1").show();

    if ($(".step3").hasClass("active")) {
        $(".step3").removeClass("active");
        $(".step2").removeClass("completed");
        $(".step1").addClass("active");
    }

    toggleExpandCard(thisCard, "card-paso-1");
}

