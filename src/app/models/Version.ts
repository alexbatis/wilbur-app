import { JsonProperty, JsonObject } from 'json2typescript';

interface IVersion {
    latestVersion: string;
    changes: Array<string>;
    downloadLinkWindows: string;
    downloadLinkMac: string;
}

@JsonObject
export class Version {
    @JsonProperty('latestVersion', String)
    public latestVersion: string;

    @JsonProperty('changes', [String])
    public changes: Array<string>;

    @JsonProperty('downloadLinkWindows', String)
    public downloadLinkWindows: string;

    @JsonProperty('downloadLinkMac', String)
    public downloadLinkMac: string;


    constructor(version?: IVersion) {
        this.latestVersion = (version && version.latestVersion) || null;
        this.changes = (version && version.changes) || [];
        this.downloadLinkWindows = (version && version.downloadLinkWindows) || null;
        this.downloadLinkMac = (version && version.downloadLinkMac) || null;
    }

}

