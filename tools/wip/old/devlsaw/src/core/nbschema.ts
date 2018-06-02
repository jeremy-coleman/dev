

export declare namespace nbformat {
    const MAJOR_VERSION: number;
    const MINOR_VERSION: number; //5.2

    interface IKernelspecMetadata extends Object {
        name: string;
        display_name: string;
    }
    

    interface ILanguageInfoMetadata extends Object {
        name: string;
        codemirror_mode?: string | Object;
        file_extension?: string;
        mimetype?: string;
        pygments_lexer?: string;
    }

//defaults
    interface INotebookMetadata extends Object {
        kernelspec: IKernelspecMetadata;
        language_info: ILanguageInfoMetadata;
        orig_nbformat: number;
    }
    

    interface INotebookContent extends Object {
        metadata: INotebookMetadata;
        nbformat_minor: number;
        nbformat: number;
        cells: ICell[];
    }
    
   
     // A multiline string.
    type MultilineString = string | string[];
 
    // A mime-type keyed dictionary of data.
    interface IMimeBundle extends Object {
        [key: string]: MultilineString | Object;
    }

     // Media attachments (e.g. inline images).
    interface IAttachments {
        [key: string]: IMimeBundle;
    }
    
    
    
   
    // The code cell's prompt number. Will be null if the cell has not been run.
    type ExecutionCount = number | null;

    // Cell output metadata.
    type OutputMetadata = Object;


    function validateMimeValue(type: string, value: MultilineString | Object): boolean;

    type CellType = 'code' | 'markdown' | 'raw';

    interface IBaseCellMetadata extends Object {

        trusted: boolean; //not nbformat https://jupyter-notebook.readthedocs.io/en/latest/security.html.

        name: string;  //The cell's name. If present, must be a non-empty string.

        tags: string[]; //The cell's tags. Tags must be unique, and must not contain commas.
    }

    interface IBaseCell extends Object {
        cell_type: string;
        source: MultilineString;
        metadata: Partial<ICellMetadata>;
    }
    

    interface IRawCellMetadata extends IBaseCellMetadata {
        format: string;//Raw cell metadata format for nbconvert.
    }


    interface IRawCell extends IBaseCell {

        cell_type: 'raw';
        metadata: Partial<IRawCellMetadata>;
        attachments?: IAttachments;
    }
    

    interface IMarkdownCell extends IBaseCell {
        cell_type: 'markdown';
        attachments?: IAttachments;
    }


    interface ICodeCellMetadata extends IBaseCellMetadata {
        collapsed: boolean;
        scrolled: boolean | 'auto'; //Whether the cell's output is scrolled, unscrolled, or autoscrolled.
    }
    

    interface ICodeCell extends IBaseCell {

        cell_type: 'code';

        metadata: Partial<ICodeCellMetadata>;

        //Execution, display, or stream outputs.
        outputs: IOutput[];

        // The code cell's prompt number. Will be null if the cell has not been run.
        execution_count: ExecutionCount;
    }
    

    interface IUnrecognizedCell extends IBaseCell { }
    

    type ICell = IRawCell | IMarkdownCell | ICodeCell | IUnrecognizedCell;

//tests
    function isRaw(cell: ICell): cell is IRawCell;
    function isMarkdown(cell: ICell): cell is IMarkdownCell;
    function isCode(cell: ICell): cell is ICodeCell;

    type ICellMetadata = IBaseCellMetadata | IRawCellMetadata | ICodeCellMetadata;
    /**
     * The valid output types.
     */
    type OutputType = 'execute_result' | 'display_data' | 'stream' | 'error' | 'update_display_data';
    /**
     * The base output type.
     */
    interface IBaseOutput extends Object {
        /**
         * Type of cell output.
         */
        output_type: string;
    }
    /**
     * Result of executing a code cell.
     */
    interface IExecuteResult extends IBaseOutput {
        /**
         * Type of cell output.
         */
        output_type: 'execute_result';
        /**
         * A result's prompt number.
         */
        execution_count: ExecutionCount;
        /**
         * A mime-type keyed dictionary of data.
         */
        data: IMimeBundle;
        /**
         * Cell output metadata.
         */
        metadata: OutputMetadata;
    }
    /**
     * Data displayed as a result of code cell execution.
     */
    interface IDisplayData extends IBaseOutput {
        /**
         * Type of cell output.
         */
        output_type: 'display_data';
        /**
         * A mime-type keyed dictionary of data.
         */
        data: IMimeBundle;
        /**
         * Cell output metadata.
         */
        metadata: OutputMetadata;
    }
    /**
     * Data displayed as an update to existing display data.
     */
    interface IDisplayUpdate extends IBaseOutput {
        /**
         * Type of cell output.
         */
        output_type: 'update_display_data';
        /**
         * A mime-type keyed dictionary of data.
         */
        data: IMimeBundle;
        /**
         * Cell output metadata.
         */
        metadata: OutputMetadata;
    }
    /**
     * Stream output from a code cell.
     */
    interface IStream extends IBaseOutput {
        /**
         * Type of cell output.
         */
        output_type: 'stream';
        /**
         * The name of the stream.
         */
        name: StreamType;
        /**
         * The stream's text output.
         */
        text: MultilineString;
    }
    /**
     * An alias for a stream type.
     */
    type StreamType = 'stdout' | 'stderr';
    /**
     * Output of an error that occurred during code cell execution.
     */
    interface IError extends IBaseOutput {
        /**
         * Type of cell output.
         */
        output_type: 'error';
        /**
         * The name of the error.
         */
        ename: string;
        /**
         * The value, or message, of the error.
         */
        evalue: string;
        /**
         * The error's traceback.
         */
        traceback: string[];
    }
    /**
     * Unrecognized output.
     */
    interface IUnrecognizedOutput extends IBaseOutput {
    }
    /**
     * Test whether an output is an execute result.
     */
    function isExecuteResult(output: IOutput): output is IExecuteResult;
    /**
     * Test whether an output is from display data.
     */
    function isDisplayData(output: IOutput): output is IDisplayData;
    /**
     * Test whether an output is from updated display data.
     */
    function isDisplayUpdate(output: IOutput): output is IDisplayUpdate;
    /**
     * Test whether an output is from a stream.
     */
    function isStream(output: IOutput): output is IStream;
    /**
     * Test whether an output is from a stream.
     */
    function isError(output: IOutput): output is IError;
    /**
     * An output union type.
     */
    type IOutput = IUnrecognizedOutput | IExecuteResult | IDisplayData | IStream | IError;
}
