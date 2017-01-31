function create_input(sentence,translation) {
  
    var div = $("<div>").addClass("sentence");
    div.append($("<label>").html("Sentence : ").attr("for","st"+i));
    div.append($('<input>').attr({class: "sentence",name: 'st' + i,size: 100,value:sentence}));
    div.append($("<button>").attr("type","button").addClass("remove").html("remove"));
    div.append($("<button>").attr("type","button").addClass("break").html("break"));
    div.append($("<button>").attr("type","button").addClass("hide_words").html("hide words"));
    div.append($("<button>").attr("type","button").addClass("hide_translation").html("hide translation"));
    div.append($("<button>").attr("type","button").addClass("add_word").html("add word"));
    div.append("<br />");
    
    var translationDiv = $("<div>").addClass("sentence_translation");
    translationDiv.append($("<label>").html("Translation : ").attr("for","st_tr"+i));
    translationDiv.append($('<input>').attr({name: 'st_tr' + i,size: 100,class:"sentence_translation",value:translation}));
    translationDiv.append("<br />");
    div.append(translationDiv);
                 
    return div;
};

//Function taking basic form of the word and creating the form out of it
function create_word_input(word, word_basic, dict) { 
    //dict is used to fill in the form with values dict["grammar"] etc.
  
    var input_section = $("<div>").addClass("word");
    var div = $("<div>"); 
    div.append($("<label>").html("Word : ")); 
    div.append($('<input>').attr({name: 'word',size: 40,value: word}));
    div.append($('<input>').attr({name: 'word_basic_form',size: 40,value: word_basic}));
    div.append($("<button>").attr("type","button").addClass("word_remove").html("remove"));
    div.append($("<button>").attr("type","button").addClass("word_hide").html("hide"));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Translation : "));
    div.append($('<input>').attr({name: 'word_translation',size: 70, value: dict["translation"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Grammar : "));
    div.append($('<input>').attr({name: 'word_grammar',size: 70,value: dict["grammar"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Verb : "));
    div.append($('<input>').attr({name: 'word_verb',size: 70, value: dict["verb"]}));
    div.append(verb_select("infinitiv"));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Connection : "));
    div.append($('<input>').attr({name: 'word_connection',size: 70, value: dict["connection"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Noun : "));
    div.append($('<input>').attr({name: 'word_noun',size: 70, value: dict["noun"]}));
    div.append(noun_select("none"));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Pronoun : "));
    div.append($('<input>').attr({name: 'word_pronoun',size: 70, value: dict["pronoun"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Adjective : "));
    div.append($('<input>').attr({name: 'word_adjective',size: 70, value: dict["adjective"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Phrase : "));
    div.append($('<input>').attr({name: 'word_phrase',size: 70, value: dict["phrase"]}));
    div.append($('<input>').attr({name: 'phrase_form',size: 70, value: dict["phrase_form"]}));
    input_section.append(div);
    div = $("<div>").addClass("wr_hide");
    div.append($("<label>").html("Relations : "));
    div.append($('<input>').attr({name: 'word_relations',size: 70, value: dict["relations"]}));
    
    input_section.append(div);
    input_section.children(".wr_hide").hide();
    return input_section;
};

function verb_select(selected) {
var select = $("<select>").attr("name","verb_form");
select.append($("<option>").val("infinitiv").html("infinitiv"));
select.append($("<option>").val("first_person_singular").html("first_person_singular"));
select.append($("<option>").val("second_person_singular").html("second_person_singular"));
select.append($("<option>").val("third_person_singular").html("third_person_singular"));
select.append($("<option>").val("third_person_singular_he").html("third_person_singular_he"));
select.append($("<option>").val("third_person_singular_she").html("third_person_singular_she"));
select.append($("<option>").val("third_person_singular_it").html("third_person_singular_it"));
select.append($("<option>").val("first_person_plural").html("first_person_plural"));
select.append($("<option>").val("second_person_plural").html("second_person_plural"));
select.append($("<option>").val("third_person_plural").html("third_person_plural"));

select.children("option[value="+selected+"]").attr('selected','selected');

return select; 

}

function noun_select(selected) {
var select = $("<select>").attr("name","noun_form");
select.append($("<option>").val("none").html("none"));
select.append($("<option>").val("nominativ_singular_indefinite").html("nominativ_singular_indefinite"));
select.append($("<option>").val("accusativ_singular_indefinite").html("accusativ_singular_indefinite"));
select.append($("<option>").val("dativ_singular_indefinite").html("dativ_singular_indefinite"));
select.append($("<option>").val("genitiv_singular_indefinite").html("genitiv_singular_indefinite"));
select.append($("<option>").val("nominativ_singular_definite").html("nominativ_singular_definite"));
select.append($("<option>").val("accusativ_singular_definite").html("accusativ_singular_definite"));
select.append($("<option>").val("dativ_singular_definite").html("dativ_singular_definite"));
select.append($("<option>").val("genitiv_singular_definite").html("genitiv_singular_definite"));
select.append($("<option>").val("nominativ_plural_definite").html("nominativ_plural_definite"));
select.append($("<option>").val("accusativ_plural_definite").html("accusativ_plural_definite"));
select.append($("<option>").val("dativ_plural_definite").html("dativ_plural_definite"));
select.append($("<option>").val("genitiv_plural_definite").html("genitiv_plural_definite"));

select.children("option[value="+selected+"]").attr('selected','selected');

return select; 

}

function create_xml(form) {
  //Form is passed
  //XML is created and returned
  var base = $("<fake_container_cause_jquery_cannot_do_outter_html>");
  var xml = $("<doc>");
  var xml_sentence = "";
  
  
  //for each sentence
  var sentence = $(form).children("fieldset").children(".sentenceSet").children("div.sentence");
  var lang = $(form).find("input[name='language']").val()
  sentence.each( function() {
  // console.log($(this)); ... sentence objects from the form
  xml_sentence = $("<sentence>");
  xml_sentence.append($("<original>"));
  xml_sentence.append($("<translation>"));
  xml_sentence.children("original").append($("<language>").html(lang));
  xml_sentence.children("translation").append($("<language>").html("cs"));
  xml_sentence.children("original").append($("<text>").html($(this).children("input.sentence").val()));
    $(this).children("div.word").each( function() {
      //for each word in the sentence, the particular fields based on the input form are created
      //each fields have basic_form and the text
      //field text can be automatically substituted from folder grammar, verbs etc, while basic_form is still kept, so that you can update in the updateForm and automatically use new translation from grammer, verb, noun etc. folder
      
       var word = $("<word>");
       word.append($("<original>"));
       word.append($("<translation>"));
       word.children("original").append($("<text>").html($(this).find("input[name='word']").val()));
       word.children("original").append($("<basic_form>").html($(this).find("input[name='word_basic_form']").val()));
       
       transl = $(this).find("input[name='word_translation']").val();
       word.children("translation").append($("<text>").html(transl));
       word.children("translation").append($("<basic_form>").html(transl));
       
       //checks if the input is not empty
       if ($(this).find("input[name='word_grammar']").val()) {
       word.children("translation").append($("<grammar>"));
       word.children("translation").children("grammar").append($("<text>").html($(this).find("input[name='word_grammar']").val())); 
       word.children("translation").children("grammar").append($("<basic_form>").html($(this).find("input[name='word_grammar']").val())); }
       if ($(this).find("input[name='word_connection']").val()) {
       word.children("translation").append($("<connection>").append($("<order>").html( $(this).find("input[name='word_connection']").val()))); }
       if ($(this).find("input[name='word_verb']").val()) {
       word.children("translation").append($("<verb>"));
       word.children("translation").children("verb").append($("<text>").attr("conj",$(this).find("select[name='verb_form']").val()).html( $(this).find("input[name='word_verb']").val()));
       word.children("translation").children("verb").append($("<basic_form>").attr("conj",$(this).find("select[name='verb_form']").val()).html( $(this).find("input[name='word_verb']").val()));}
       if ($(this).find("input[name='word_noun']").val()) {
       word.children("translation").append($("<noun>"));
       word.children("translation").children("noun").append($("<text>").attr("decl",$(this).find("select[name='noun_form']").val()).html($(this).find("input[name='word_noun']").val()));
       word.children("translation").children("noun").append($("<basic_form>").attr("decl",$(this).find("select[name='noun_form']").val()).html($(this).find("input[name='word_noun']").val()));}
       if ($(this).find("input[name='word_pronoun']").val()) {
       word.children("translation").append($("<pronoun>"));       
       word.children("translation").children("pronoun").append($("<text>").html($(this).find("input[name='word_pronoun']").val()));
       word.children("translation").children("pronoun").append($("<basic_form>").html($(this).find("input[name='word_pronoun']").val()));
       }
       
       if ($(this).find("input[name='word_adjective']").val()) {
       word.children("translation").append($("<adjective>"));
       word.children("translation").children("adjective").append($("<text>").html($(this).find("input[name='word_adjective']").val()));
       word.children("translation").children("adjective").append($("<basic_form>").html($(this).find("input[name='word_adjective']").val()));
       }
       if ($(this).find("input[name='word_phrase']").val()) {
       word.children("translation").append($("<phrase>"));
       word.children("translation").children("phrase").attr("highlight",$(this).find("input[name='phrase_form']").val());
       word.children("translation").children("phrase").append($("<text>").html($(this).find("input[name='word_phrase']").val()));
       word.children("translation").children("phrase").append($("<basic_form>").html($(this).find("input[name='word_phrase']").val()));
       }
       if ($(this).find("input[name='word_relations']").val()) {
       word.children("translation").append($("<relations>"));
       word.children("translation").children("relations").append($("<text>").html($(this).find("input[name='word_relations']").val())); 
       word.children("translation").children("relations").append($("<basic_form>").html($(this).find("input[name='word_relations']").val())); }
       
       xml_sentence.children("original").append(word);
    });
   xml_sentence.children("translation").append($("<text>").html($(this).children("div.sentence_translation").children("input.sentence_translation").val()));
   //console.log($(this).children("input.sentence").val());
  xml.append(xml_sentence);
  });
  base.append(xml);
  //console.log(base.html());
  return base.html();
};