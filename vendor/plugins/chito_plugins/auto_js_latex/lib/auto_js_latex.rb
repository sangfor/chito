    module BlogHelperPlugin
	def add_auto_js_latex_js_link_in_head
	    if @user.enable_auto_js_latex
		plugin_javascript_inculde_tag('auto_js_latex', "jquery.jslatex.packed.js") + "\n"
	    end
	end
	def add_auto_js_latex_in_blog_tail
	    if @user.enable_auto_js_latex
	      %Q! <script type="text/javascript">
		    function auto_js_latex(){
			try{
			    $('#article_content').html($('#article_content').html().replace(/\\[tex\\]/g, "<span class='latex_eq'>").replace(/\\[\\/tex\\]/g, "</span>"));
			}catch(e){;}
			try{
			    $('.post_brief').each(function(index){
				$(this).html($(this).html().replace(/\\[tex\\]/g, "<span class='latex_eq'>").replace(/\\[\\/tex\\]/g, "</span>"));
			    });
			}catch(e){;}
			$(".latex_eq").latex(); 
		    }
		    $(document).ready(auto_js_latex);
		</script>
	       !
	    end
	end
    end