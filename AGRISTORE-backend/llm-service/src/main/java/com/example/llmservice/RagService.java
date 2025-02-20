package com.example.llmservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import java.util.List;

/**
 * IngestionService is responsible for processing a PDF document,
 * splitting its content into smaller text chunks, and storing these chunks
 * in a VectorStore for further processing (e.g., AI-related operations).
 */
@Component
public class RagService implements CommandLineRunner {

    // Logger to log information and debugging details
    private static final Logger log = LoggerFactory.getLogger(RagService.class);

    // A VectorStore instance used to store processed text chunks
    private final VectorStore vectorStore;

    // Constructor to initialize the VectorStore dependency
    public RagService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }


    // Injecting the PDF file as a resource from the classpath
    @Value("classpath:/docs/Product_2_Catalog.pdf")
    private Resource Doc;


    @Override

    /** rag vector base from a pdf file*/
    public void run(String... args) throws Exception {
        // Create a PDF reader to extract content from the specified PDF document
        var pdfReader = new PagePdfDocumentReader(Doc);

        // TextSplitter is used to split large chunks of text into smaller pieces
        TextSplitter textSplitter = new TokenTextSplitter();

        // Extract the text content from the PDF document as a list of documents
        List<Document> liste1 = pdfReader.get();

        // Split the extracted documents into smaller chunks using the text splitter
        List<Document> liste2 = textSplitter.apply(liste1);

        // Log the number of smaller text chunks created after splitting
        log.info("Nombre de documents extraits: {}", liste2.size());

        // Store the smaller text chunks into the VectorStore
        vectorStore.accept(liste2);

        // Log a confirmation message indicating that the VectorStore is loaded
        log.info("VectorStore chargé avec les données");
    }


}