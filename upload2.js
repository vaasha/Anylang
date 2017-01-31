$(document).ready(function () {

        var main_page = $('#text_win').attr("ld");
        var trn = $('#translation_win');
        

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
              //console.log($("#text_win").html());
      
              //console.log(text_win.children('sentence').children('original').children('language').html());
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

var showTraslation = function(event){
  event.stopPropagation();
  
  var txt; 
  txt = "<b>Věta:</b>" + $(this).parent().parent().children('translation').children('text').html();
  txt += "<br /><br />"
  //console.log($(this).children("original").children("basic_form").html());
  if ($(this).children("original").children("basic_form").length > 0) {
  txt += "<b>Slovo</b>: " + $(this).children("original").children("basic_form").html() + "<br />";
  } else {
  txt += "<b>Slovo</b>: " + $(this).html() + "<br />";
  }
  
  txt += "<b>Překlad</b>: " + $(this).children('translation').children('text').html() + "<br /><br />";
  if($(this).children('translation').children('grammar').length > 0) {
  txt += "<b>Gramatika</b>:<br /> " + $(this).children('translation').children('grammar').html() + "<br /><br />"; }
  if($(this).children('translation').children('phrase').length > 0) {
  txt += "<b>Fráze</b>:<br /> " + $(this).children('translation').children('phrase').html() + "<br /><br />"; }
  if($(this).children('translation').children('verb').length > 0) {
  txt += "<b>Sloveso</b>:<br />  " + $(this).children('translation').children('verb').html() + "<br /><br />"; }
  if($(this).children('translation').children('noun').length > 0) {
  txt += "<b>Podstatné jméno</b>:<br />  " + $(this).children('translation').children('noun').html() + "<br /><br />"; }
  if($(this).children('translation').children('pronoun').length > 0) {
  txt += "<b>Zájmeno</b>:<br />  " + $(this).children('translation').children('pronoun').html() + "<br /><br />"; }
  if($(this).children('translation').children('relations').length > 0) {                               
  txt += "<b>Příbuzné</b>:<br />  " + $(this).children('translation').children('relations').html() + "<br /><br />"; }
  
  trn.html(txt);
  
  
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
  var objectToHighlight = object.parent().children("word:nth-child("+getWordOrder(object)+")");
  if(on == "add") {
  objectToHighlight.addClass('connection');
  object.addClass('connection');
    }
  else {
  objectToHighlight.removeClass('connection');
  object.removeClass('connection');
    }
  }

};

function getWordOrder(object) {

var order = object.children('translation').children('connection').children('order').html();
//console.log(order + ":" + object.index())
var order_real = parseInt(object.index()) + parseInt(order) + 1;
//console.log(order_real.toString());
return order_real.toString(); 

};


//all verb nodes in the source will be substitutes from verb.xml
function substituteAllVerbsAjax(div) {
  
  var xmlDocToProcess =  $(div);
  //console.log(xmlDocToProcess);
  xmlDocToProcess.find("verb").each(function(){
    var highlight = $(this).attr("conj");
    var html = '';
    $.ajax({
        context: this,
        type: "GET",
        url: "../../../verbs/" + $(this).html() + ".xml",
        cache: false,
        dataType: "xml",
        success: function(xml) {
          
         
          //Parse the givn XML
          var xmlDoc = $( xml );
          //console.log(xmlDoc.children('verb').children('original').html());
          //console.log($(this).html()); 
          
          table = $('<table>').addClass('verb'); 
          verbOriginal = xmlDoc.children('verb').children('original').html();
          verbTranslate = xmlDoc.children('verb').children('translate').html();

          table.append($("<tr>").append($("<th>").attr('colspan',2).html(verbOriginal + " - " + verbTranslate).addClass(highlight == "infinitiv" ? "active" : "")));
            OriginalSing = xmlDoc.children('verb').children('first_person_singular').children('original').html();
            TranslateSing = xmlDoc.children('verb').children('first_person_singular').children('translate').html();
            OriginalPlur = xmlDoc.children('verb').children('first_person_plural').children('original').html();
            TranslatePlur = xmlDoc.children('verb').children('first_person_plural').children('translate').html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "first_person_singular" ? "active" : "").html(OriginalSing + " - " + TranslateSing)).append($("<td>").addClass(highlight == "first_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = xmlDoc.children('verb').children('second_person_singular').children('original').html();
            TranslateSing = xmlDoc.children('verb').children('second_person_singular').children('translate').html();
            OriginalPlur = xmlDoc.children('verb').children('second_person_plural').children('original').html();
            TranslatePlur = xmlDoc.children('verb').children('second_person_plural').children('translate').html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "second_person_singular" ? "active" : "").html(OriginalSing + " - " + TranslateSing)).append($("<td>").addClass(highlight == "second_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = xmlDoc.children('verb').children('third_person_singular_he').children('original').html();
            TranslateSing = xmlDoc.children('verb').children('third_person_singular_he').children('translate').html();
            OriginalPlur = xmlDoc.children('verb').children('third_person_plural_they').children('original').html();
            TranslatePlur = xmlDoc.children('verb').children('third_person_plural_they').children('translate').html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" ? "active" : "").addClass("noBottomBorder").html(OriginalSing + " - " + TranslateSing)).append($("<td>").attr("rowspan",3).addClass(highlight == "third_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = xmlDoc.children('verb').children('third_person_singular_she').children('original').html();
            TranslateSing = xmlDoc.children('verb').children('third_person_singular_she').children('translate').html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" || highlight == "third_person_singular_she" ? "active" : "").addClass("noBottomBorder").addClass("noTopBorder").html(OriginalSing + " - " + TranslateSing)));
            OriginalSing = xmlDoc.children('verb').children('third_person_singular_it').children('original').html();
            TranslateSing = xmlDoc.children('verb').children('third_person_singular_it').children('translate').html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" ? "active" : "").addClass("noTopBorder").html(OriginalSing + " - " + TranslateSing)));
          $(this).html(table);
          //console.log(html);
          //console.log($(this).html());
          //console.log(xmlDocToProcess.find('verb').html());
        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
          console.log(textStatus);
          console.log(errorThrown);
        }
        
        
   })/*.done($(this).html(html))*/;
    
   }) 
   
};

});