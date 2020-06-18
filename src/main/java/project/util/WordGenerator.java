package project.util;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;

import org.docx4j.dml.wordprocessingDrawing.Inline;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.BinaryPartAbstractImage;
import org.docx4j.wml.ContentAccessor;
import org.docx4j.wml.Drawing;
import org.docx4j.wml.ObjectFactory;
import org.docx4j.wml.P;
import org.docx4j.wml.R;
import org.docx4j.wml.Tbl;
import org.docx4j.wml.Tc;
import org.docx4j.wml.Text;
import org.docx4j.wml.Tr;

public class WordGenerator {
	
	
	public WordprocessingMLPackage getTemplate(String name)
			throws Docx4JException, FileNotFoundException {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
	    InputStream input =    classLoader.getResourceAsStream(name);
		
		WordprocessingMLPackage template = WordprocessingMLPackage.load(input);
		return template;
	}

	public static List<Object> getAllElementFromObject(Object obj,
			Class<?> toSearch) {
		List<Object> result = new ArrayList<Object>();
		if (obj instanceof JAXBElement)
			obj = ((JAXBElement<?>) obj).getValue();

		if (obj.getClass().equals(toSearch))
			result.add(obj);
		else if (obj instanceof ContentAccessor) {
			List<?> children = ((ContentAccessor) obj).getContent();
			for (Object child : children) {
				result.addAll(getAllElementFromObject(child, toSearch));
			}

		}
		return result;
	}
	public   P newImage( 
			WordprocessingMLPackage wordMLPackage, byte[] bytes )
			throws Exception {
		ObjectFactory factory = new ObjectFactory();
		BinaryPartAbstractImage imagePart = BinaryPartAbstractImage
				.createImagePart(wordMLPackage, bytes);
		Inline inline = imagePart.createImageInline("Not Found", "Not found", 0,1);

		P p = factory.createP();
		R run = factory.createR();

		p.getParagraphContent().add(run);
		Drawing drawing = factory.createDrawing();
		run.getRunContent().add(drawing);
		drawing.getAnchorOrInline().add(inline);

		return p;
	}
	public void replacePlaceholder(WordprocessingMLPackage template,
			String name, String placeholder) {
		List<Object> texts = getAllElementFromObject(
				template.getMainDocumentPart(), Text.class);
		//System.out.println("BUSCANDO:  "
		//		+ placeholder);
		for (Object text : texts) {
			Text textElement = (Text) text;
			if (textElement.getValue().trim().equals(placeholder)) {
			//	System.out.println("Se encontro el campo: "
				//		+ textElement.getValue());
				textElement.setValue(name);
			}else{
				//System.out.println("No:    "+ textElement.getValue());
			}
		}
	}

	
	private Tbl getTemplateTable(List<Object> tables, String templateKey) throws Docx4JException, JAXBException {
		for (Iterator<Object> iterator = tables.iterator(); iterator.hasNext();) {
			Object tbl = iterator.next();
			List<?> textElements = getAllElementFromObject(tbl, Text.class);
			for (Object text : textElements) {
				Text textElement = (Text) text;
				if (textElement.getValue() != null && textElement.getValue().equals(templateKey))
					return (Tbl) tbl;
			}
		}
		return null;
	}
	  

	public void replaceCellTableWithImage(String[] placeholders, P pImage,
			WordprocessingMLPackage template) throws Docx4JException, JAXBException {
		List<Object> tables = getAllElementFromObject(template.getMainDocumentPart(), Tbl.class);
		 
		// 1. find the table
		Tbl tempTable = getTemplateTable(tables, placeholders[0]);
		System.out.println(tempTable);
		List<Object> rows = getAllElementFromObject(tempTable, Tr.class);
  
		if (rows.size() == 1) {
			
			List<Object> cols = getAllElementFromObject((Tr)rows.get(0), Tc.class);
			Tc tc = (Tc) cols.get(0);
			tc.getContent().remove(0);
            tc.getContent().add(pImage);
		}
	} 
}

