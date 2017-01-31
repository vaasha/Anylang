$(document).ready(function () {

        var main_page = $('#text_win').attr("ld");
        var translation_window = $('#translation_win');
        

prepareTextWin(main_page);
pageMeta();

function pageMeta() {
 //console.log(document.location.href);
}

function prepareTextWin(xml_name) {        
        $.ajax({
            type: "GET",
            url: xml_name + ".xml",
            cache: false,
            dataType: "xml",
            success: function(xml) {

            //get all sentences
            text = displaySentences(xml);
            
              var text_win = $("#text_win");                   
              text_win.append(text);
              
              lang =  text_win.children('sentence').children('original').children('language').html();
              
              text_win.children('sentence').children('translation').hide();
              text_win.children('sentence').children('original').children('text').hide();
              text_win.children('sentence').children('original').children('language').hide();
              text_win.children('sentence').children('original').children('word').children('original').children('basic_form').hide();
              text_win.children('sentence').children('original').children('word').children('translation').hide();
            
            $(document).on("click.translate", function(){
                $('word').on("mouseenter.translate", showTraslation);
              });
      
              $('word').on("mouseenter.translate", showTraslation);
              $('word').on("click.translate", showTraslation).on("click.translate", function() {
                $('word').off("mouseenter.translate"); 
                event.stopPropagation(); });
              
              
              //Change word to normal font
              $('word').on("mouseleave.bold", function(){
                $(this).children('original').children('text').css("font-weight","normal");
                wordConnection($(this),"remove");
              });
              $('word').on("mouseenter.bold", function(){
                $(this).children('original').children('text').css("font-weight","bold");
                wordConnection($(this));
              });
            },
            error: function(xmlHttpRequest, textStatus, errorThrown) {
              console.log(textStatus);
              console.log(errorThrown);
            }
            
    });
    
    ;};  

//Function which creates the html into #
var showTraslation = function(event){
  event.stopPropagation();
  
  var txt; 
  txt = "<b>Věta:</b>" + $(this).parent().parent().children('translation').children('text').html();
  txt += "<br /><br />"
  if ($(this).children("original").children("basic_form").length > 0) {
  txt += "<b>Slovo</b>: " + $(this).children("original").children("basic_form").html() + "<br />";
  } else {
  txt += "<b>Slovo</b>: " + $(this).html() + "<br />";
  }
  
  txt += "<b>Překlad</b>: " + $(this).children('translation').children('text').html() + "<br /><br />";
  if($(this).children('translation').children('grammar').length > 0) {
  txt += "<b>Gramatika</b>:<br /> " + $(this).children('translation').children('grammar').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('phrase').length > 0) {
  txt += "<b>Fráze</b>:<br /> " + $(this).children('translation').children('phrase').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('verb').length > 0) {
  txt += "<b>Sloveso</b>:<br />  " + $(this).children('translation').children('verb').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('noun').length > 0) {
  txt += "<b>Podstatné jméno</b>:<br />  " + $(this).children('translation').children('noun').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('adjective').length > 0) {
  txt += "<b>Přídavné jméno</b>:<br />  " + $(this).children('translation').children('adjective').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('pronoun').length > 0) {
  txt += "<b>Zájmeno</b>:<br />  " + $(this).children('translation').children('pronoun').children("text").html() + "<br /><br />"; }
  if($(this).children('translation').children('relations').length > 0) {                               
  txt += "<b>Příbuzné</b>:<br />  " + $(this).children('translation').children('relations').children("text").html() + "<br /><br />"; }
  
  translation_window.html(txt);
  
  
};




//Xml processing functions

function displaySentences(xml) {
  var text = '' //return all sentence nodes
  
  //Parse the givn XML
  var xmlDoc = $( xml );     
  
  var $sentence = xmlDoc.find("sentence");  
  
  
  $sentence.each(function(){      
      text += "<sentence>" + $(this).html() + "</sentence>".replace(/(\r\n|\n|\r)/gm,''); //replace linebreaks so that white spaces are not rendered                                                                                  
  });
  return text;
};

function wordConnection(object,on="add") {

if(object.children('translation').children('connection').children('order').length > 0) {
  $.each(getWordOrderArray(object), function(i,v) {
  console.log(v);
  var objectToHighlight = object.parent().children("word:nth-child("+v+")");
  if(on == "add") {
  objectToHighlight.addClass('connection');
  object.addClass('connection');
    }
  else {
  objectToHighlight.removeClass('connection');
  object.removeClass('connection');
    }  
  })
  
  
  }

};

function getRealOrder(object) {

$.each(object.children('translation').children('connection').children('order').html().split(','),function(i,v){
  var order_real = parseInt(object.index()) + parseInt(v) + 1;
  console.log(order_real.toString()); 
});
};

function getWordOrderArray(object) {
  return object.children('translation').children('connection').children('order').html().split(',').map(function(order) {
    return parseInt(object.index()) + parseInt(order) + 1;
  });
};


    
});