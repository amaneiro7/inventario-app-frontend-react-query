export interface ItemsTickects {
	d: D
}

export interface D {
	results: Result[]
}

export interface Result {
	__metadata: Metadata
	FirstUniqueAncestorSecurableObject: Activities
	RoleAssignments: Activities
	Activities: Activities
	AttachmentFiles: Activities
	ContentType: Activities
	GetDlpPolicyTip: Activities
	FieldValuesAsHtml: Activities
	FieldValuesAsText: Activities
	FieldValuesForEdit: Activities
	File: Activities
	Folder: Activities
	LikedByInformation: Activities
	ParentList: Activities
	Properties: Activities
	Versions: Activities
	FileSystemObjectType: number
	Id: number
	ServerRedirectedEmbedUri: null
	ServerRedirectedEmbedUrl: string
	ContentTypeId: string
	Title: string
	ComplianceAssetId: null
	UsuarioId: number
	UsuarioStringId: string
	TipoDeCaso: null
	Prioridad: string
	Status: string
	Fecha: Date
	descripcion: string
	Comentarios: string
	AsignadoId: number
	AsignadoStringId: string
	Observaciones: null
	Tipo_x0020_de_x0020_CasoId: string
	Telefono: string
	Nombre: string
	Zona: string
	Fecha_x0020_Limite: Date
	FechaCulminacion: Date
	ParentCod: null
	GroupsDepId: number
	GroupsDepStringId: string
	Correo: null
	EnvioCor: number
	EnvioCor0: null
	EjecutadoId: number
	EjecutadoStringId: string
	ID: number
	Modified: Date
	Created: Date
	AuthorId: number
	EditorId: number
	OData__UIVersionString: string
	Attachments: boolean
	GUID: string
}

export interface Activities {
	__deferred: Deferred
}

export interface Deferred {
	uri: string
}

export interface Metadata {
	id: string
	uri: string
	etag: string
	type: string
}
