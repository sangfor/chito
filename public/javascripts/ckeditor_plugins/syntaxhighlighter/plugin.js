﻿(function() {
/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'syntaxhighlighter',
{
	requires: [ 'iframedialog' ],
	init : function( editor )
	{
		var me = this;
		CKEDITOR.dialog.add( 'SyntaxHighlighterDialog', function (){
			return {
				title : 'SyntaxHighlighter Dialog',
				minWidth : 550,
				minHeight : 500,
				contents :
					[
						{
							id : 'iframe',
							label : 'SyntaxHighlighter',
							expand : true,
							elements :
								[
									{
										type : 'html',
										id : 'pageSyntaxHighlighter',
										label : 'SyntaxHighlighter',
										style : 'width : 350px;height: 550px;',
										html : '<iframe src="'+me.path+'dialog.html" frameborder="0" name="iframeSyntaxHighlighter" id="iframeSyntaxHighlighter" allowtransparency="1" style="width:100%;height:530px;margin:0;padding:0;"></iframe>'
									}
								]
						}
					],
				onOk : function() {
					var editor = this.getParentEditor();

                                        var frame_doc = document.getElementById('iframeSyntaxHighlighter').contentWindow.document;
                                        var slang_obj = frame_doc.getElementById('slang');
                                        var fln_obj = frame_doc.getElementById('fln')
                                        var title_obj = frame_doc.getElementById('c_t')
                                        var collapse_obj = frame_doc.getElementById('c_c')
                                        var code_obj = frame_doc.getElementById('code');
                                        var code_text = "";
                                        if(code_obj && code_obj.value.length > 0)
	                                    code_text = code_obj.value.replace(/</g,"&lt;").replace(/>/g,"&gt;");

	                                var html = "<pre class='brush: " + slang_obj.value;
                                        if(fln_obj.value.length > 0)
                                            html += "; first-line: " + fln_obj.value;
                                        if(collapse_obj.checked)
                                            html += "; collapse: true";
        
                                        html += "\'";
                                        if(title_obj.value.length >0)
                                            html += " title=\"" + title_obj.value + "\"";
                                        
                                        html += ">" + code_text + "</pre>";

	                                document.getElementById('iframeSyntaxHighlighter').contentWindow.set_form_cookie();
	                                editor.insertHtml(html);
				}
			};
		});


		// Register the toolbar buttons.
		editor.ui.addButton( 'SyntaxHighlighter',
			{
				label : 'SyntaxHighlighter',
				icon : this.path + 'toolbar.png',
				command : 'syntaxhighlighter'
			});

		// Register the commands.
		editor.addCommand( 'syntaxhighlighter', new CKEDITOR.dialogCommand( 'SyntaxHighlighterDialog' ));
	}
});
})();