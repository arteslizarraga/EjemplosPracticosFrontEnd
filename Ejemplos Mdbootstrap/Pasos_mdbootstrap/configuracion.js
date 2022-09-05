
function pasarSegundoPaso() 
{
    $("#card-paso-2").show();

    $(".step1").removeClass("active");
    $(".step3").removeClass("active");
    //$(".step1").addClass("completed");
    $(".step2").addClass("active");

    $("#card-paso-1").hide();
    $("#card-paso-3").hide(); 
}

function pasarTercerPaso() 
{
    $("#card-paso-3").show();

    $(".step2").removeClass("active");
    //$(".step2").addClass("completed");
    $(".step3").addClass("active");

    $("#card-paso-1").hide();
    $("#card-paso-2").hide(); 
}

function resetearPasos() 
{    
    $("#card-paso-1").show();

    $(".step3").removeClass("active");
    $(".step2").removeClass("active");
    $(".step2").removeClass("completed");
    $(".step1").addClass("active");

    $("#card-paso-2").hide();
    $("#card-paso-3").hide();
}

