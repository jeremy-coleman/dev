interface IConfigRegistry {
    configure(configName: string) : Promise<any>;
}

export { IConfigRegistry  }