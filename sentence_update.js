var i = 0;
 
$(document).ready(function () {
  console.clear();
  var main_page = $('#create');
  
  main_page.append(createFormUpdate());
  
  //onclick events
  $(document).on("click","form a#down",function(){
    //DownloadXML();
    this.download = $(this).parents("form").find("input.file_name").val() + ".xml";
    this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent("<?xml version='1.0' ?>"+create_xml($(this).parents("form")));  
  });
  
  $(document).on("click","form .downsuper",function(){
    var output = $("div#output"); 
    var lang = $("form").find("input[name='language']").val();
    output.html(create_xml($(this).parents("form")));
    substituteAllTypes(output, "", lang);
  });
  
    $(document).on("click","form .downaftersuper",function(){
    var output = $("div#output"); 
    var lang = $("form").find("input[name='language']").val();
    this.download = $(this).parents("form").find("input.file_name").val() + ".xml";
    this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent("<?xml version='1.0' ?>"+output.html());
    
    
  });
  
  //Get xml for particular path and fill in the form with it
  $(document).on("click","form .get_xml", function(e) {
    e.preventDefault(); //button send the form and page is reuploaded, so you have to prevent this so that the new fields doesn't disappear       
    path = $('input.file_name').val();
    //console.log(path);
    getXML(path);
    //$('#create form').html(createForm(getXML(path),path));
    return false;
  });
  
  $(document).on("click","form .add_sentence", function(e) {
    e.preventDefault(); //button send the form and page is reuploaded, so you have to prevent this so that the new fields doesn't disappear
    i++;
   $(this).parent().children(".sentenceSet").children("div:last").after(create_input());
    return false;
  });
  
  $(document).on("click","form .remove", function(e){
    e.preventDefault();

    $(this).parent().remove();
    return false;
  });
  
  $(document).on("click","form .word_remove", function(e){
    e.preventDefault();

    $(this).parent().parent().remove();
    return false;
  });
  
  $(document).on("click","form .break", function(e){
    e.preventDefault();

    var input_value = $(this).parent().children("input").val();
    var words = input_value.split(' ');
    var that = $(this);
    var len = words.length;

    $.each( words, function( index, value ){
     
      value_trimmed = value.replace(/ /g,'').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      
     //Last words doesn't have extra white space after its punctuation
     if (index != len - 1) {
      value = value + " ";
     }
     
     that.parent().append(create_word_input(value, value_trimmed,{"translation": "xxx", "grammar":"gram"}));
     
    });
    return false;
  });
  
  $(document).on("click","form .hide_words", function(e){
    e.preventDefault();
    $(this).parent().children(".word").toggle(); 
    return false;
  });
  
  $(document).on("click","form .hide_translation", function(e){
    e.preventDefault();
    $(this).parent().children(".sentence_translation").toggle(); 
    return false;
  });
  
  $(document).on("click","form .add_word", function(e){
    e.preventDefault();
    $(this).parent().children(".word:last").after(create_word_input("", "",{"translation": "", "grammar":""})); 
    return false;
  });
  
  $(document).on("click","form .word_hide", function(e){
    e.preventDefault();
    $(this).parent().parent().children(".wr_hide").toggle(); 
    return false;
  });
  
  //after click on hide all button, all words and all translation are toggled (hidden/visible)
  $(document).on("click",".hide_all", function(e){
    e.preventDefault();
    console.log("HHola");
    $(this).parent().parent().children(".sentenceSet").children(".sentence").each(function()
      {$(this).children(".word").toggle()}
    ); 
    return false;
  });
  
  $(document).on("click","form .create_xml", function(e){
    e.preventDefault();
    //console.log($(this).parents("form"));
    create_xml($(this).parents("form")) 
    return false;
  });
  
  
                
});

function trimWord(input_word) {
  valueTrimmed = input_word.replace(/ /g,"").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); 
  return valueTrimmed;
}

//Function which connects to a particular xml file via ajax and calls createFormUpdate to fill in the update form from a xml file based on basic_form fields
function getXML(path) {        
  $.ajax({
      type: "GET",
      url: path,
      cache: false,
      dataType: "xml",
      success: function(xml) {      
        $('#create').html(createFormUpdate(xml,path));
     }
  })
};

//Function to go through each xml element of the language set and gets its basic_form value into the form
function fillTheForm(xmlDoc) {            
  //console.log(xmlDoc);
  var sentencesDiv = $("<DIV>").addClass("sentenceSet");
  //create sentence original & translation for each sentence                              
  xmlDoc.children("doc").children("sentence").each(function() {
    //console.log($(this).html());
    Orig = $(this).children("original").children("text").html();
    Trans = $(this).children("translation").children("text").html();
    var sentence = create_input(Orig,Trans);
    //for each word create the details
    $(this).children("original").children("word").each( function() {
      Orig = $(this).children("original");
      Trans = $(this).children("translation");
      //trim original value to have both original full (to create sentence in correct composotion with all blank spaces) and trimmed version to work with in the word detail sections
      value_trimmed = Orig.children("text").html().replace(/ /g,'').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      //create_word_input function uses dictionary as a third parameter, which pass values for all linguistics fields 
      sentence.append(create_word_input(Orig.children("text").html(), value_trimmed ,{"translation": Trans.children("text").html(), "grammar":Trans.children("grammar").children("basic_form").html(), "noun":Trans.children("noun").children("basic_form").html(), "verb":Trans.children("verb").children("basic_form").html(), "phrase":Trans.children("phrase").children("basic_form").html(), "phrase_form":Trans.children("phrase").children("basic_form").attr("highlight"), "connection":Trans.children("connection").children("order").html(), "relations":Trans.children("relations").children("basic_form").html(), "pronoun":Trans.children("pronoun").children("basic_form").html(), "adjective":Trans.children("adjective").children("basic_form").html()}));
    });
    
    sentencesDiv.append(sentence);
    
    
  });
  return sentencesDiv;
 };
 
 //Fills in the form headers so that you can update ... based on input xml file in sourceName
function createFormUpdate(input_xml="", sourceName = "Idn/Sentences/Lesson001/sentences.xml") {
 form = $("<form>"); 
  var fieldset = ($("<fieldset>"));
  
  var create_xml_button = $("<button>").html("create xml").addClass("create_xml").attr("type","button");
  fieldset.append(create_xml_button);
  
  //File name
  var div = $("<div>").addClass("file_name");
  div.append($("<label>").html("File name : "));
  div.append(sentence = $('<input>').attr({
    class: "file_name",
    size: 50,
    value: sourceName
    }));
  div.append($("<button>").html("get xml").addClass("get_xml").attr("type","button"));
  div.append($("<button>").html("hide all words").addClass("hide_all").attr("type","button"));  
  fieldset.append(div);
  
  //Title
  div = fieldset.append($("<div>").addClass("title"));
  div.append($("<label>").html("Title : "));
  div.append(sentence = $('<input>').attr({class: "title",size: 50,value: "" }));
  fieldset.append(div);
  
  var xmlDoc = $( input_xml );
  
    //Language
  div = fieldset.append($("<div>").addClass("language"));
  div.append($("<label>").html("Language : "));
  var language_value =  xmlDoc.find("sentence").children("original").children("language").html();
  //console.log(language_value);
  div.append(sentence = $('<input>').attr({class: "language", name:"language",size: 50,value: language_value }));
  fieldset.append(div);

  //Fills in the form based on xml document or create just one empty sentence field
  if (xmlDoc.length > 0) {
     fieldset.append(fillTheForm(xmlDoc)); 
  } else {
  var sentencesDiv = $("<DIV>").addClass("sentenceSet");
  sentencesDiv.append(create_input("a","b"));
  fieldset.append(sentencesDiv);
  }
  
  var add_sentence_button = $("<button>").html("add sentence").addClass("add_sentence").attr("type","button");
  
   
  fieldset.append(add_sentence_button);
  fieldset.append(create_xml_button);
  //obsolete type of downloading
  //fieldset.append($("<a>").attr("id","down").html("Download xml "));
  var add_create_super_xml_button = $("<button>").html("Create Super XML").addClass("downsuper").attr("type","button");
  fieldset.append(add_create_super_xml_button)
  //var add_create_super_download_button = $("<button>").html("Download Super XML").addClass("downaftersuper").attr("type","button");
  //fieldset.append(add_create_super_download_button)
  fieldset.append($("<a>").addClass("downaftersuper").html("Download ")); //need href attribute and thus need anchor link
  form.append(fieldset);
  return form;
 };            