let vista_3D_activa = true;

$(window).load(function()
{
  $("#data a").click(function(e) 
  {
    e.preventDefault();
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
  });

  $("body").removeClass('view-2D opening').addClass("view-3D").queue(function() {
    $(this).removeClass('hide-UI').addClass("set-speed"); 
  });
});

const cambiarVista = () => 
{
  let body = $("body"); 
  vista_3D_activa = vista_3D_activa ? false : true;

  if (vista_3D_activa)
    body.removeClass('view-2D opening').addClass("view-3D")
  else 
    body.toggleClass("view-3D view-2D");
}

const marcarPlanetaSeleccionado = (nombre) => 
{
  $("#solar-system").removeClass().addClass(nombre);
}

